import './App.css';
import { useEffect, useState } from "react";
import { addUser, getUser, updateUser } from "./services/firestore"; // 🔑 Firestore funksiyalari

function App() {
  const [user, setUser] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [userId, setUserId] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    if (tg.initDataUnsafe?.user) {
      const tgUser = tg.initDataUnsafe.user;
      setUser(tgUser);
      setUserId(tgUser.id);

      // 🔥 Firestore’da userni yaratish yoki olish
      async function loadUser() {
        await addUser(tgUser.id.toString(), {
          firstname: tgUser.first_name,
          lastname: tgUser.last_name,
          username: tgUser.username || "",
          photo: tgUser.photo_url || "",
          balance: 0,
          task: [{ id: "join_channel", completed: false, reward: 5000 }]
        });

        const dbUser = await getUser(tgUser.id.toString());
        if (dbUser) {
          setBalance(dbUser.balance || 0);
        }
      }

      loadUser();
    }
  }, []);

  const checkMembership = () => {
    if (!userId) return;

    const BOT_TOKEN = "TOKENINGIZNI_QO'YING";
    const CHANNEL = "@haresog";

    fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL}&user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          const status = data.result.status;
          if (["member", "administrator", "creator"].includes(status)) {
            setIsMember(true);
          } else {
            setIsMember(false);
          }
        } else {
          setIsMember(false);
        }
      })
      .catch(() => setIsMember(false));
  };

  const claim = async () => {
    if (!userId) return;

    const reward = 5000;
    const newBalance = balance + reward;
    setBalance(newBalance);
    setClicked(true);

    // 🔥 Firestore’da balance yangilash
    await updateUser(userId.toString(), {
      balance: newBalance,
      task: [{ id: "join_channel", completed: true, reward }]
    });
  };

  function userInfo() { showPage("user-info"); }
  function home() { showPage("home"); }
  function giveaway() { showPage("giveaway"); }
  function refer() { showPage("referral"); }
  function task() { showPage("task"); }

  function showPage(id) {
    ["home", "user-info", "giveaway", "referral", "task"].forEach(page => {
      const el = document.getElementById(page);
      if (el) el.style.display = page === id ? "flex" : "none";
    });
  }

  function copy() {
    const input = document.querySelector('.ref-input');
    navigator.clipboard.writeText(input.value).then(() => {
      const copytext = document.getElementById('copytext');
      copytext.style.display = "flex";
      copytext.style.animation = "1.5s ease opa";
      setTimeout(() => {
        copytext.style.display = "none";
      }, 1500);
    });
  }

  function connectWallet() {
    const tg = window.Telegram.WebApp;
    tg.showAlert("Ton wallet connection will be available soon!");
  }

  return (
    <div className="App">
      <div id="home">
        <nav>
          <button className='user-logo' onClick={userInfo}>
            {user?.photo_url && <img src={user.photo_url} alt="User" />}
          </button>
          <h3>{user ? user.username : "Not set!"}</h3>
        </nav>
        <div className='space1'>
          <button className='connect-wallet' onClick={connectWallet}>
            <i class="fa-solid fa-wallet"></i> <p>Connect wallet</p>
          </button>
        </div>
        <div className='space2'>
          <img src='/hare.png' alt='hare logo' className='logo' />
        </div>
        <div className='balance'>
          <h1 className='white'>{balance}</h1>
          <h3 className='white'>HARES</h3>
        </div>
        <div className='space1'></div>
        <div className='space1'>
          <a href='https://t.me/haresog' className='community-link'>
            <div><i class="fa-solid fa-users"></i> Join our community</div> <i class="fa-solid fa-angle-right"></i>
          </a>
        </div>
        <footer>
          <i class="fa-solid fa-house dodgerblue" onClick={home}></i>
          <i class="fa-solid fa-hand-holding-dollar" onClick={giveaway}></i>
          <i class="fa-solid fa-user-group" onClick={refer}></i>
          <i class="fa-solid fa-list-check" onClick={task}></i>
        </footer>
      </div>
      <div id='user-info'>
        <div className='user-about'>
          <div className='user-photo'>
            <div className='img-user'>
              {user && user.photo_url && (
                <img src={user.photo_url} alt="User picture" />
              )}
            </div>
          </div>
          <div className='space1'></div>
          <div className='first-name'>
            <h2>First name:</h2>
            <h2> {user ? user.first_name : "Not set!"}</h2>
          </div>
          <div className='last-name'>
            <h2>Last name:</h2>
            <h2> {user ? user.last_name : "Not set!"}</h2>
          </div>
          <div className='username'>
            <h2>Username:</h2>
            <h2> {user ? user.username : "Not set!"}</h2>
          </div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <footer>
            <i class="fa-solid fa-house" onClick={home}></i>
            <i class="fa-solid fa-hand-holding-dollar" onClick={giveaway}></i>
            <i class="fa-solid fa-user-group" onClick={refer}></i>
            <i class="fa-solid fa-list-check" onClick={task}></i>
          </footer>
        </div>
      </div>
      <div id='giveaway'>
        <div className='giveaway'>
          <nav>
            <button className='user-logo' onClick={userInfo}>
              {user && user.photo_url && (
                <img src={user.photo_url} alt="User picture" />
              )}
            </button>
            <h3>{user ? user.username : "Not set!"}</h3>
          </nav>
          <div className='space1'></div>
          <div className='space1'>
            <h2 className='white'>There is a no giveaway</h2>
          </div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <footer>
            <i class="fa-solid fa-house" onClick={home}></i>
            <i class="fa-solid fa-hand-holding-dollar dodgerblue" onClick={giveaway}></i>
            <i class="fa-solid fa-user-group" onClick={refer}></i>
            <i class="fa-solid fa-list-check" onClick={task}></i>
          </footer>
        </div>
      </div>
      <div id='referral'>
        <div className='referral'>
          <nav>
            <button className='user-logo' onClick={userInfo}>
              {user && user.photo_url && (
                <img src={user.photo_url} alt="User picture" />
              )}
            </button>
            <h3>{user ? user.username : "Not set!"}</h3>
          </nav>
          <div className='space1'>
            <div className='referral-link'>
              <h2 className='white'>Your referral link:</h2>
            </div>
          </div>
          <div id='copytext'>Referral link copied to clipboard</div>
          <div className='space1'>
            <div className='referral-link'>
              <input type='text' value={`https://t.me/your_bot/hares?startapp=ref${user ? user.id : "unknown"}`} readOnly className='ref-input' />
              <button className='copy-btn' onClick={copy}>
                <i class="fa-solid fa-copy"></i> Copy
              </button>
            </div>
          </div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <div className='space1'></div>
          <footer>
            <i class="fa-solid fa-house" onClick={home}></i>
            <i class="fa-solid fa-hand-holding-dollar" onClick={giveaway}></i>
            <i class="fa-solid fa-user-group dodgerblue" onClick={refer}></i>
            <i class="fa-solid fa-list-check" onClick={task}></i>
          </footer>
        </div>
      </div>
      <div id='task'>
        <div className='task'>
          <nav>
            <button className='user-logo' onClick={userInfo}>
              {user?.photo_url && <img src={user.photo_url} alt="User" />}
            </button>
            <h3>{user ? user.username : "Not set!"}</h3>
          </nav>
          <div className='space1'>
            <h2 className='white'>Task list</h2>
          </div>
          <div className='task-list'>
            <div className='task-item1'>
              <div className='icons'>
                <i class="fa-brands fa-telegram"></i>
              </div>
              <h3 style={{ color: 'white', marginRight: 'auto' }}>+5000</h3>
              {isMember ? (
                <button
                  className="claim-btn"
                  onClick={claim}
                  style={{
                    color: clicked ? "rgb(0, 0, 10)" : "white",
                    backgroundColor: clicked ? "rgba(100, 100, 100, 0.5)" : "dodgerblue",
                  }}
                >
                  Claim
                </button>
              ) : (
                <button className='check-btn' onClick={checkMembership}>
                  check
                </button>
              )}
            </div>
          </div>
          <footer>
            <i class="fa-solid fa-house" onClick={home}></i>
            <i class="fa-solid fa-hand-holding-dollar" onClick={giveaway}></i>
            <i class="fa-solid fa-user-group" onClick={refer}></i>
            <i class="fa-solid fa-list-check dodgerblue" onClick={task}></i>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
