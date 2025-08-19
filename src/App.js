import './App.css';
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [userId, setUserId] = useState(null);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    tg.ready();

    if (tg.initDataUnsafe?.user?.id) {
      setUserId(tg.initDataUnsafe.user.id);
    }
  }, []);

  const checkMembership = () => {
    if (!userId) return;

    const BOT_TOKEN = "8280702108:AAH2Q2jcYODiImoTfLdQKlKSZL7qk091ehA";
    const CHANNEL = "@haresog";

    fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=${CHANNEL}&user_id=${userId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          const status = data.result.status;
          if (
            status === "member" ||
            status === "administrator" ||
            status === "creator"
          ) {
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

  const userInfo = () => {
    const userINfo = document.getElementById('user-info');
    userINfo.style.display = "flex";
    const referral = document.getElementById('referral');
    referral.style.display = "none";
    const giveaway = document.getElementById('giveaway');
    giveaway.style.display = "none";
    const task = document.getElementById('task');
    task.style.display = "none";
  }

  function home(){
    const userINfo = document.getElementById('user-info');
    userINfo.style.display = "none";
    const giveaway = document.getElementById('giveaway');
    giveaway.style.display = "none";
    const referral = document.getElementById('referral');
    referral.style.display = "none";
    const task = document.getElementById('task');
    task.style.display = "none";
  }

  function giveaway(){
    const userINfo = document.getElementById('user-info');
    userINfo.style.display = "none";
    const giveaway = document.getElementById('giveaway');
    giveaway.style.display = "flex";
    const referral = document.getElementById('referral');
    referral.style.display = "none";
    const task = document.getElementById('task');
    task.style.display = "none";
  }

  function refer(){
    const userINfo = document.getElementById('user-info');
    userINfo.style.display = "none";
    const giveaway = document.getElementById('giveaway');
    giveaway.style.display = "none";
    const referral = document.getElementById('referral');
    referral.style.display = "flex";
    const task = document.getElementById('task');
    task.style.display = "none";
  }

  function task(){
    const userINfo = document.getElementById('user-info');
    userINfo.style.display = "none";
    const giveaway = document.getElementById('giveaway');
    giveaway.style.display = "none";
    const referral = document.getElementById('referral');
    referral.style.display = "none";
    const task = document.getElementById('task');
    task.style.display = "flex";
  }

  function copy() {
    const input = document.querySelector('.ref-input');
    navigator.clipboard.writeText(input.value)
      .then(() => {
        const copytext = document.getElementById('copytext');
        copytext.style.display = "flex";
        copytext.style.animation = " 1.5s ease opa";
        setTimeout(() => {
          copytext.style.display = "none";
        }, 1500); 
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy referral link.');
      });
  }

  function connectWallet() {
    const tg = window.Telegram.WebApp;
    tg.showAlert("Ton wallet connection will be available soon!");
  }
  function claim() {
    const balance = document.getElementById('balance');
    balance += 3000;
    setClicked(true);
  }

  return (
    <div className="App">
      <div id="home">
        <nav>
          <button className='user-logo' onClick={userInfo}>
            {user && user.photo_url && (
              <img src={user.photo_url} alt="User picture" />
            )}
          </button>
          <h3>{user ? user.username : "Not set!"}</h3>
        </nav>
        <div className='space1'>
          <button className='connect-wallet' onClick={connectWallet}><i class="fa-solid fa-wallet"></i> <p>Connect wallet</p></button>
        </div>
        <div className='space2'>
          <img src='/hare.png' alt='hare logo' className='logo'/>
        </div>
        <div className='balance'>
          <h1 className='white' id='balance'>0</h1>
          <h3 className='white'>HARES</h3>
        </div>
        <div className='space1'></div>
        <div className='space1'>
          <a href='https://t.me/haresog' className='community-link'><div><i class="fa-solid fa-users"></i> Join our community</div> <i class="fa-solid fa-angle-right"></i></a>
        </div>
        <div className='space1'></div>
        <div className='space1'></div>
        <div className='space1'></div>
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
              {user && user.photo_url && (
                <img src={user.photo_url} alt="User picture" />
              )}
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
              <h3 style={{color: 'white', marginRight: 'auto'}}>+5000</h3>
                {isMember === true && (
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
                )}
                {isMember === false && (
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
