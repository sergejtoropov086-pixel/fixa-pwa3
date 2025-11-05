// === ЯДРО БАЗЫ ДАННЫХ FIXA PRO ===
window.FixaDB = window.FixaDB || {};
window.FixaDB.models = [];
window.FixaDB.spareParts = [];
window.FixaDB.symptoms = [];
window.FixaDB.medicines = [];
window.FixaDB.serviceCenters = [];
window.FixaDB.pharmacies = [];
window.FixaDB.stores = [];

// === СИМПТОМЫ И ПРЕПАРАТЫ (готово) ===
window.FixaDB.symptoms = [
  {id:"SYM001",name:"Головная боль",possibleDiagnoses:["Мигрень","Артериальное давление","Напряжение"]},
  {id:"SYM002",name:"Тошнота",possibleDiagnoses:["Отравление","Беременность","Гастрит"]},
  {id:"SYM003",name:"Кашель",possibleDiagnoses:["ОРВИ","Аллергия","Бронхит"]},
  {id:"SYM004",name:"Боли в животе",possibleDiagnoses:["Гастрит","Аппендицит","Панкреатит"]},
  {id:"SYM005",name:"Высокая температура",possibleDiagnoses:["Инфекция","Воспаление"]},
  {id:"SYM006",name:"Слабость",possibleDiagnoses:["Анемия","Инфекция","Стресс"]},
  {id:"SYM007",name:"Головокружение",possibleDiagnoses:["Артериальное давление","Остеохондроз","Анемия"]},
  {id:"SYM008",name:"Боли в горле",possibleDiagnoses:["Ангина","Фарингит","ОРВИ"]},
  {id:"SYM009",name:"Насморк",possibleDiagnoses:["ОРВИ","Аллергия","Синусит"]},
  {id:"SYM010",name:"Боли в спине",possibleDiagnoses:["Остеохондроз","Травма","Мышечное напряжение"]},
  {id:"SYM011",name:"Одышка",possibleDiagnoses:["Астма","Сердечная недостаточность","Анемия"]},
  {id:"SYM012",name:"Сыпь",possibleDiagnoses:["Аллергия","Корь","Ветрянка"]},
  {id:"SYM013",name:"Рвота",possibleDiagnoses:["Отравление","Гастрит","Мигрень"]},
  {id:"SYM014",name:"Понос",possibleDiagnoses:["Отравление","Дизентерия","Непереносимость"]},
  {id:"SYM015",name:"Запор",possibleDiagnoses:["Недостаток клетчатки","Обезвоживание","Геморрой"]}
];

window.FixaDB.medicines = [
  {id:"MED001",name:"Нурофен",use:"Боль, воспаление, температура",contraindications:"Язва ЖКТ, бронхиальная астма"},
  {id:"MED002",name:"Смекта",use:"Диарея, отравление",contraindications:"Непроходимость кишечника"},
  {id:"MED003",name:"Лазолван",use:"Кашель с мокротой",contraindications:"Первый триместр беременности"},
  {id:"MED004",name:"Энтеросгель",use:"Детоксикация, отравления",contraindications:"Непроходимость кишечника"},
  {id:"MED005",name:"Цетрин",use:"Аллергия",contraindications:"Беременность, лактация"},
  {id:"MED006",name:"Парацетамол",use:"Боль, температура",contraindications:"Заболевания печени"},
  {id:"MED007",name:"Кетанов",use:"Сильная боль",contraindications:"Язва ЖКТ, почечная недостаточность"},
  {id:"MED008",name:"Бисептол",use:"Бактериальные инфекции",contraindications:"Беременность, печеночная недостаточность"},
  {id:"MED009",name:"Ангионорм",use:"Нарушения микроциркуляции",contraindications:"Гиперчувствительность"},
  {id:"MED010",name:"Мезим",use:"Нарушение пищеварения",contraindications:"Острый панкреатит"},
  {id:"MED011",name:"Лоратадин",use:"Аллергия",contraindications:"Беременность"},
  {id:"MED012",name:"Фуросемид",use:"Отеки, гипертония",contraindications:"Печеночная кома"},
  {id:"MED013",name:"Метформин",use:"Сахарный диабет",contraindications:"Почечная недостаточность"},
  {id:"MED014",name:"Омепразол",use:"Гастрит, язва",contraindications:"Гиперчувствительность"},
  {id:"MED015",name:"Аспирин",use:"Боль, жар, тромбы",contraindications:"Язва ЖКТ, беременность"}
];

// === СЕРВИСЫ ЕКАТЕРИНБУРГА (готово) ===
window.FixaDB.serviceCenters = [
  {id:"SC001",name:"БытТехСервис",address:"ул. Ленина, 10, Екатеринбург",phone:"+7 (343) 123-45-67",type:"Стиральные машины"},
  {id:"SC002",name:"ХолодМастер",address:"пр. Космонавтов, 50",phone:"+7 (343) 234-56-78",type:"Холодильники"},
  {id:"SC003",name:"ТехноДом",address:"ул. Малышева, 70",phone:"+7 (343) 345-67-89",type:"Вся техника"},
  {id:"SC004",name:"LG Service Center",address:"ул. 8 Марта, 35",phone:"+7 (343) 456-78-90",type:"Телевизоры, холодильники"},
  {id:"SC005",name:"Samsung Service",address:"ТРЦ Гринвич, 3 этаж",phone:"+7 (343) 567-89-01",type:"Телевизоры, стиральные машины"},
  {id:"SC006",name:"Атлант Сервис",address:"ул. Чкалова, 25",phone:"+7 (343) 678-90-12",type:"Холодильники Atlant"},
  {id:"SC007",name:"Indesit Ремонт",address:"пр. Ленина, 100",phone:"+7 (343) 789-01-23",type:"Стиральные машины Indesit"},
  {id:"SC008",name:"ЭлектроСервис",address:"ул. Мира, 40",phone:"+7 (343) 890-12-34",type:"Плиты, духовки"},
  {id:"SC009",name:"ТВ-Мастер",address:"ул. Победы, 55",phone:"+7 (343) 901-23-45",type:"Телевизоры"},
  {id:"SC010",name:"КофеСервис",address:"ул. Ленина, 20",phone:"+7 (343) 012-34-56",type:"Кофемашины"}
];

window.FixaDB.pharmacies = [
  {id:"PH001",name:"Аптека 36.6",address:"пр. Космонавтов, 25",phone:"+7 (343) 987-65-43"},
  {id:"PH002",name:"Ригла",address:"ул. 8 Марта, 45",phone:"+7 (343) 876-54-32"},
  {id:"PH003",name:"Надежда",address:"ул. Ленина, 30",phone:"+7 (343) 765-43-21"},
  {id:"PH004",name:"Аптека Доброго Дня",address:"ул. Малышева, 50",phone:"+7 (343) 654-32-10"},
  {id:"PH005",name:"Семейная Аптека",address:"пр. Ленина, 15",phone:"+7 (343) 543-21-09"},
  {id:"PH006",name:"Аптека Планета",address:"ул. Амундсена, 30",phone:"+7 (343) 432-10-98"},
  {id:"PH007",name:"Аптека Столички",address:"пр. Космонавтов, 80",phone:"+7 (343) 321-09-87"},
  {id:"PH008",name:"Аптека Вита",address:"ул. 8 Марта, 60",phone:"+7 (343) 210-98-76"},
  {id:"PH009",name:"Аптека Лекфарм",address:"ул. Мира, 35",phone:"+7 (343) 109-87-65"},
  {id:"PH010",name:"Аптека Здоровья",address:"ул. Победы, 50",phone:"+7 (343) 098-76-54"}
];

window.FixaDB.stores = [
  {id:"ST001",name:"М.Видео",address:"ТРЦ Гринвич",phone:"+7 (343) 210-00-00"},
  {id:"ST002",name:"Эльдорадо",address:"ТРЦ Мега",phone:"+7 (343) 310-10-10"},
  {id:"ST003",name:"Ситилинк",address:"ул. Щорса, 50",phone:"+7 (343) 410-20-20"},
  {id:"ST004",name:"DNS",address:"ТРЦ Радуга Парк",phone:"+7 (343) 510-30-30"},
  {id:"ST005",name:"Техносила",address:"ул. Амундсена, 60",phone:"+7 (343) 610-40-40"},
  {id:"ST006",name:"Яндекс Маркет Постамат",address:"ул. Ленина, 85",phone:"+7 (343) 710-50-50"},
  {id:"ST007",name:"Озон Пункт",address:"пр. Космонавтов, 70",phone:"+7 (343) 810-60-60"},
  {id:"ST008",name:"ВсеИнструменты.ру",address:"ул. Чкалова, 40",phone:"+7 (343) 910-70-70"},
  {id:"ST009",name:"Касторама",address:"ул. Заводская, 100",phone:"+7 (343) 010-80-80"},
  {id:"ST010",name:"Леруа Мерлен",address:"ул. Промышленная, 200",phone:"+7 (343) 110-90-90"}
];
