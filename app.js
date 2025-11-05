// === FIXAPRO PROFESSIONAL — GitHub Edition ===
// Максимум функционала на чистом JS. Никаких сборок.

let db = null;
let currentView = 'home';

// Инициализация SQLite в браузере
async function initDatabase() {
  try {
    document.getElementById('app').innerHTML = 'Инициализация базы данных...';
    
    // Загружаем WASM-модуль SQLite
    const SQL = await initSqlJs({ locateFile: filename => `lib/${filename}` });
    
    // Создаём базу в памяти
    db = new SQL.Database();
    
    // Создаём схему
    db.run(`
      CREATE TABLE appliances (
        id INTEGER PRIMARY KEY,
        brand TEXT,
        model TEXT,
        type TEXT,
        errors TEXT
      );
      CREATE TABLE medical (
        id INTEGER PRIMARY KEY,
        code TEXT,
        title_ru TEXT,
        description_ru TEXT,
        warning TEXT
      );
    `);
    
    // Загружаем данные
    await loadDatabase();
    
    render();
  } catch (e) {
    console.error('Ошибка инициализации базы:', e);
    document.getElementById('app').innerHTML = `
      <div class="card">
        <h2>❌ Ошибка базы данных</h2>
        <p>Убедитесь, что:</p>
        <ul>
          <li>Папка <code>database/</code> существует</li>
          <li>Файлы <code>appliances.json</code> и <code>medical.json</code> внутри</li>
          <li>Файл <code>lib/sql-wasm.js</code> загружен</li>
        </ul>
        <button class="btn" onclick="location.reload()">Попробовать снова</button>
      </div>
    `;
  }
}

// Загрузка данных из JSON
async function loadDatabase() {
  try {
    // Техника
    const appliancesRes = await fetch('/database/appliances.json');
    if (!appliancesRes.ok) throw new Error('Не удалось загрузить appliances.json');
    const appliances = await appliancesRes.json();
    const stmt = db.prepare("INSERT INTO appliances (brand, model, type, errors) VALUES (?, ?, ?, ?)");
    appliances.forEach(item => {
      stmt.bind([item.brand, item.model, item.type, item.errors.join(',')]);
      stmt.step();
      stmt.reset();
    });
    stmt.free();
    
    // Медицина
    const medicalRes = await fetch('/database/medical.json');
    if (!medicalRes.ok) throw new Error('Не удалось загрузить medical.json');
    const medical = await medicalRes.json();
    const stmt2 = db.prepare("INSERT INTO medical (code, title_ru, description_ru, warning) VALUES (?, ?, ?, ?)");
    medical.forEach(item => {
      stmt2.bind([item.code, item.title_ru, item.description_ru, item.warning]);
      stmt2.step();
      stmt2.reset();
    });
    stmt2.free();
    
    console.log('✅ База загружена: техника + медицина');
  } catch (e) {
    console.error('Ошибка загрузки данных:', e);
    throw e;
  }
}

// Рендер интерфейса
function render() {
  let html = '';
  
  if (currentView === 'home') {
    html = `
      <div class="header">
        <h1>FixaPro Professional</h1>
        <p>Всё знание мира — офлайн, без облака</p>
      </div>
      <div class="card">
        <button class="btn" onclick="currentView='appliances'; render();">🔧 Техника (10 000+ моделей)</button>
        <button class="btn" onclick="currentView='medical'; render();">🏥 Медицина (80 000+ болезней)</button>
        <button class="btn" onclick="useVoice()">🎤 Голосовой поиск</button>
        <button class="btn" onclick="openCamera()">📸 Сканер модели</button>
      </div>
      <p class="status">Данные загружены локально. Интернет не требуется.</p>
    `;
    
  } else if (currentView === 'appliances') {
    html = `
      <h2>Техника</h2>
      <input type="text" id="searchAppl" placeholder="Поиск по модели..." oninput="searchAppliances(this.value)" />
      <div id="results"></div>
      <button class="btn" onclick="currentView='home'; render();">← Назад</button>
    `;
    searchAppliances('');
    
  } else if (currentView === 'medical') {
    html = `
      <h2>Медицина (МКБ-11)</h2>
      <input type="text" id="searchMed" placeholder="Поиск по коду или названию..." oninput="searchMedical(this.value)" />
      <div id="results"></div>
      <button class="btn" onclick="currentView='home'; render();">← Назад</button>
    `;
    searchMedical('');
  }
  
  document.getElementById('app').innerHTML = html;
}

// Поиск
function searchAppliances(query) {
  let sql = "SELECT * FROM appliances";
  if (query) sql += ` WHERE model LIKE ? OR brand LIKE ?`;
  const stmt = db.prepare(sql);
  let results;
  if (query) {
    results = stmt.getAsObject({0: `%${query}%`, 1: `%${query}%`});
  } else {
    results = stmt.getAsObject();
  }
  stmt.free();
  
  renderResults(results, 'appl');
}

function searchMedical(query) {
  let sql = "SELECT * FROM medical";
  if (query) sql += ` WHERE code LIKE ? OR title_ru LIKE ?`;
  const stmt = db.prepare(sql);
  let results;
  if (query) {
    results = stmt.getAsObject({0: `%${query}%`, 1: `%${query}%`});
  } else {
    results = stmt.getAsObject();
  }
  stmt.free();
  
  renderResults(results, 'med');
}

function renderResults(results, type) {
  const container = document.getElementById('results');
  if (!results || results.length === 0) {
    container.innerHTML = '<p class="status">Ничего не найдено</p>';
    return;
  }
  
  container.innerHTML = results.map(item => {
    if (type === 'appl') {
      return `
        <div class="card">
          <strong>${item.brand} ${item.model}</strong><br>
          Тип: ${item.type}<br>
          Ошибки: ${item.errors.split(',').join(', ')}
        </div>
      `;
    } else {
      return `
        <div class="card">
          <strong>${item.code} — ${item.title_ru}</strong><br>
          ${item.description_ru || ''}<br>
          <small style="color:#ff6b6b;">${item.warning}</small>
        </div>
      `;
    }
  }).join('');
}

// Голосовой поиск
function useVoice() {
  if (!('webkitSpeechRecognition' in window)) {
    alert('Голос работает только в Chrome или Edge на Android/iOS');
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'ru-RU';
  recognition.start();
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    if (currentView === 'appliances') {
      document.getElementById('searchAppl').value = text;
      searchAppliances(text);
    } else if (currentView === 'medical') {
      document.getElementById('searchMed').value = text;
      searchMedical(text);
    }
  };
}

// Камера (QR)
function openCamera() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  input.onchange = (e) => {
    alert('QR-сканер: в профессиональной версии распознаёт модель техники');
    // В реальной версии: используйте jsQR для анализа фото
  };
  input.click();
}

// Запуск
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

initDatabase();
