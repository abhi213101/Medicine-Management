const {app, BrowserWindow, ipcMain} = require('electron')      
const sqlite3 = require('sqlite3').verbose();


var fonts = {
	Roboto: {
		normal: './Roboto-Regular.ttf',
		bold: './Roboto-Medium.ttf',
		italics: './Roboto-Italic.ttf',
		bolditalics: './Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');
const { Col } = require('react-bootstrap');
const { NODATA } = require('dns');
const homeDir = require('os').homedir();
const desktopDir = `${homeDir}/Desktop`;


let adminDB = new sqlite3.Database('./AdminDB.db');
let db;
adminDB.run('CREATE TABLE IF NOT EXISTS "AdminTable" ("username"	TEXT NOT NULL UNIQUE,"password"	TEXT NOT NULL,"securityQue"	TEXT NOT NULL,"answer"	TEXT NOT NULL,"hospitalName"	TEXT NOT NULL,"totalDatabase"	INTEGER NOT NULL DEFAULT 0,"currentDatabase"	TEXT,PRIMARY KEY("username"));');

let mainWindow;

var disp;
let q = "SELECT hospitalName FROM AdminTable;";
adminDB.get(q, [], (err, row) => {
  if(err){
    disp = "NULL";
  }

  else {
    disp = row.hospitalName;
  }
});

var dataBase;
let q2 = "SELECT currentDatabase FROM AdminTable;";
adminDB.get(q2, [], (err, row) => {
  if(err){
    dataBase = "NULL";
  }

  else {
    dataBase = row.currentDatabase;
  }
});




app.on('ready', () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    },
    height: 800,
    width: 990,
    resizable: false
  });
  mainWindow.loadURL("http://localhost:3000");
});







ipcMain.on('SignUp', (event, SignUpData) => {

  firstYear = new Date().getFullYear();
  secondYear = firstYear + 1;
  dataBaseName = firstYear.toString()+"-"+secondYear.toString();
  db = new sqlite3.Database('./'+dataBaseName+'.db');
  
  let query2 = "INSERT INTO AdminTable (username, password, securityQue, answer, hospitalName, totalDatabase, currentDataBase) VALUES ('"+SignUpData.username+"','"+SignUpData.password+"','"+SignUpData.sq+"','"+SignUpData.answer+"','"+SignUpData.disp+"',1,'"+dataBaseName+"');";
  adminDB.run(query2)

  tables();
  setTimeout(triggers, 3000);

  
  mainWindow.webContents.send('SignUpResult', true); 
});







function tables(){
  db.run('CREATE TABLE "mainTable" ("ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"schNo"	TEXT NOT NULL DEFAULT "OS","type"	TEXT NOT NULL,"name"	INTEGER NOT NULL UNIQUE,"oldPrice"	REAL NOT NULL DEFAULT 0,"newPrice"	REAL NOT NULL DEFAULT 0,"lastYearConsumption" INTEGER NOT NULL DEFAULT 0,"OBCurrentQuantity"	INTEGER NOT NULL DEFAULT 0,"RFODCurrentQuantity"	INTEGER NOT NULL DEFAULT 0,"RFCMSCurrentQuantity"	INTEGER NOT NULL DEFAULT 0,"LPCurrentQuantity"	INTEGER NOT NULL DEFAULT 0,"PMJAKCurrentQuantity"	INTEGER NOT NULL DEFAULT 0);');
  db.run('CREATE TABLE "receiveTable" ("key"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"ID"	INTEGER NOT NULL,"batch"	TEXT NOT NULL,"quantity"	INTEGER NOT NULL DEFAULT 0,"expDate"	TEXT NOT NULL,"date"	TEXT NOT NULL,"type"	TEXT NOT NULL,FOREIGN KEY("ID") REFERENCES "mainTable"("ID") ON DELETE CASCADE);');
  db.run('CREATE TABLE "currentTable" ("key"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"ID"	INTEGER NOT NULL,"batch"	TEXT NOT NULL,"quantity"	INTEGER NOT NULL,"expDate"	TEXT NOT NULL,"date"	INTEGER,"type"	TEXT NOT NULL,FOREIGN KEY("ID") REFERENCES "mainTable"("ID") ON DELETE CASCADE)');
  db.run('CREATE TABLE "consumptionTable" ("key"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"ID"	INTEGER NOT NULL,"batch"	TEXT NOT NULL,"quantity"	INTEGER NOT NULL DEFAULT 0,"expDate"	TEXT NOT NULL,"date"	TEXT NOT NULL,"type"	TEXT NOT NULL,"useType"	TEXT NOT NULL DEFAULT "consumption","currentKey" INTEGER NOT NULL,FOREIGN KEY("ID") REFERENCES "mainTable"("ID") ON DELETE CASCADE);');
  db.run('CREATE TABLE "storeAccount" ("ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"name"	TEXT NOT NULL UNIQUE,"OBQuantity"	INTEGER NOT NULL DEFAULT 0,"OBValue"	REAL NOT NULL DEFAULT 0,"RFODQuantity"	INTEGER NOT NULL DEFAULT 0,"RFODValue"	REAL NOT NULL DEFAULT 0,"RFCMSQuantity"	INTEGER NOT NULL DEFAULT 0,"RFCMSValue"	REAL NOT NULL DEFAULT 0,"LPQuantity"	INTEGER NOT NULL DEFAULT 0,"LPValue"	REAL NOT NULL DEFAULT 0,"PMJAKQuantity"	INTEGER NOT NULL DEFAULT 0,"PMJAKValue"	REAL NOT NULL DEFAULT 0,"totalRecieveQuantity"	INTEGER NOT NULL DEFAULT 0,"totalRecieveValue"	REAL NOT NULL DEFAULT 0,"consumptionQuantity"	INTEGER NOT NULL DEFAULT 0,"consumptionValue"	REAL NOT NULL DEFAULT 0,"transferQuantity"	INTEGER NOT NULL DEFAULT 0,"transferValue"	REAL NOT NULL DEFAULT 0,"totalUseQuantity"	INTEGER NOT NULL DEFAULT 0,"totalUseValue"	REAL NOT NULL DEFAULT 0,"closingQuantity"	INTEGER NOT NULL DEFAULT 0,"closingValue"	REAL NOT NULL DEFAULT 0,FOREIGN KEY("ID") REFERENCES "mainTable"("ID") ON DELETE CASCADE);');
  db.run('CREATE TABLE "scheduleIndent" ("ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"schNo"	TEXT NOT NULL DEFAULT "OS","srNo"	INTEGER NOT NULL DEFAULT 0,"name"	TEXT NOT NULL,"lastYearConsumption"	INTEGER NOT NULL DEFAULT 0,"bufferStock"	INTEGER NOT NULL DEFAULT 0,"currentBalance"	INTEGER NOT NULL DEFAULT 0,"requirement"	INTEGER NOT NULL DEFAULT 0,"recieveQuantity"	INTEGER,"brand"	TEXT NOT NULL DEFAULT " ", "company"	TEXT NOT NULL DEFAULT " ","batch"	TEXT NOT NULL DEFAULT " ","manufactureDate"	TEXT NOT NULL DEFAULT " ","expDate"	TEXT NOT NULL DEFAULT " ","dateBookNo"	TEXT NOT NULL DEFAULT " ","pageDateBookNo"	TEXT NOT NULL DEFAULT " ","sign"	TEXT NOT NULL DEFAULT " ","sign2"	TEXT NOT NULL DEFAULT " ","remark"	TEXT NOT NULL DEFAULT " ",FOREIGN KEY("ID") REFERENCES "mainTable"("ID") ON DELETE CASCADE);');
  db.run('CREATE TABLE "emergencyIndent" ("ID"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, "schNo"	TEXT NOT NULL DEFAULT "OS", "srNo"	INTEGER NOT NULL DEFAULT 0, "name"	TEXT NOT NULL, "lastYearConsumption"	INTEGER NOT NULL DEFAULT 0, "bufferStock"	INTEGER NOT NULL DEFAULT 0, "currentBalance"	INTEGER NOT NULL DEFAULT 0, "requirement"	INTEGER NOT NULL DEFAULT 0, "recieveQuantity"	INTEGER,"brand"	TEXT NOT NULL DEFAULT " ","company"	TEXT NOT NULL DEFAULT " ","batch"	TEXT NOT NULL DEFAULT " ","manufactureDate"	TEXT NOT NULL DEFAULT " ","expDate"	TEXT NOT NULL DEFAULT " ","dateBookNo"	TEXT NOT NULL DEFAULT " ","pageDateBookNo"	TEXT NOT NULL DEFAULT " ","sign"	TEXT NOT NULL DEFAULT " ", "sign2"	TEXT NOT NULL DEFAULT " ", "remark"	TEXT NOT NULL DEFAULT " ",FOREIGN KEY("ID") REFERENCES "mainTable"("ID") ON DELETE CASCADE);');
  db.run('CREATE TABLE "register" ("key"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,"ID"	INTEGER NOT NULL, "date"	TEXT NOT NULL,"info"	TEXT NOT NULL,"price"	INTEGER NOT NULL DEFAULT 0,"income"	INTEGER NOT NULL DEFAULT 0,"use"	INTEGER NOT NULL DEFAULT 0,"remain"	INTEGER NOT NULL,"sign"	TEXT NOT NULL DEFAULT " ",FOREIGN KEY("ID") REFERENCES "mainTable"("ID") ON DELETE CASCADE);');
}






function triggers() {
  db.run('CREATE TRIGGER nameInsertion AFTER INSERT ON mainTable BEGIN INSERT INTO storeAccount (ID,name,OBValue)VALUES (new.ID,new.name,new.oldPrice);INSERT INTO scheduleIndent (ID,schNo,name,lastYearConsumption,bufferStock,currentBalance) VALUES (new.ID,new.schNo,new.name,new.lastYearConsumption,ROUND(new.lastYearConsumption*5/12, 0),new.OBCurrentQuantity+new.RFODCurrentQuantity+new.RFCMSCurrentQuantity+new.LPCurrentQuantity+new.PMJAKCurrentQuantity);	INSERT INTO emergencyIndent (ID,schNo,name,lastYearConsumption,bufferStock,currentBalance) VALUES (new.ID, new.schNo,new.name, new.lastYearConsumption,ROUND(new.lastYearConsumption*3/12, 0),new.OBCurrentQuantity+new.RFODCurrentQuantity+new.RFCMSCurrentQuantity+new.LPCurrentQuantity+new.PMJAKCurrentQuantity);	END;');
  db.run('CREATE TRIGGER OBReceiveUpdate AFTER INSERT ON receiveTable WHEN new.type="OB" BEGIN UPDATE mainTable SET OBCurrentQuantity=OBCurrentQuantity+new.quantity WHERE ID = new.ID; UPDATE storeAccount SET OBQuantity=OBQuantity+new.quantity, totalRecieveQuantity=totalRecieveQuantity+new.quantity, closingQuantity=closingQuantity+new.quantity WHERE ID = new.ID; UPDATE scheduleIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID; UPDATE emergencyIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID; END;');
  db.run('CREATE TRIGGER RFCMSReceiveUpdate AFTER INSERT ON receiveTable WHEN new.type="RFCMS" BEGIN UPDATE mainTable SET RFCMSCurrentQuantity=RFCMSCurrentQuantity+new.quantity WHERE ID = new.ID; UPDATE storeAccount SET RFCMSQuantity=RFCMSQuantity+new.quantity, totalRecieveQuantity=totalRecieveQuantity+new.quantity, closingQuantity=closingQuantity+new.quantity WHERE ID = new.ID; UPDATE scheduleIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID; UPDATE emergencyIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID; END;');
  db.run('CREATE TRIGGER RFODReceiveUpdate AFTER INSERT ON receiveTable WHEN new.type="RFOD"  BEGIN  UPDATE mainTable SET RFODCurrentQuantity=RFODCurrentQuantity+new.quantity WHERE ID = new.ID;  UPDATE storeAccount SET RFODQuantity=RFODQuantity+new.quantity,  totalRecieveQuantity=totalRecieveQuantity+new.quantity, closingQuantity=closingQuantity+new.quantity WHERE ID = new.ID; UPDATE scheduleIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID;  UPDATE emergencyIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID; END;');
  db.run('CREATE TRIGGER LPReceiveUpdate AFTER INSERT  ON receiveTable WHEN new.type="LP" BEGIN UPDATE mainTable SET LPCurrentQuantity=LPCurrentQuantity+new.quantity WHERE ID = new.ID; UPDATE storeAccount SET LPQuantity=LPQuantity+new.quantity, totalRecieveQuantity=totalRecieveQuantity+new.quantity, closingQuantity=closingQuantity+new.quantity WHERE ID = new.ID;  UPDATE scheduleIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID;  UPDATE emergencyIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID; END;');
  db.run('CREATE TRIGGER PMJAKReceiveUpdate  AFTER INSERT ON receiveTable WHEN new.type="PMJAK" BEGIN   UPDATE mainTable SET PMJAKCurrentQuantity=PMJAKCurrentQuantity+new.quantity WHERE ID = new.ID;   UPDATE storeAccount SET PMJAKQuantity=PMJAKQuantity+new.quantity,  totalRecieveQuantity=totalRecieveQuantity+new.quantity,  closingQuantity=closingQuantity+new.quantity  WHERE ID = new.ID;  UPDATE scheduleIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID;  UPDATE emergencyIndent SET currentBalance=currentBalance+new.quantity WHERE ID = new.ID;  END;');
  db.run('CREATE TRIGGER recieveCurrentUpdate  AFTER INSERT  ON receiveTable BEGIN   INSERT INTO currentTable VALUES (new.key,  new.ID,  new.batch,  new.quantity,  new.expDate,  new.date,  new.type); END;');
  db.run('CREATE TRIGGER LPConsumptionUpdate  AFTER INSERT  ON consumptionTable WHEN new.type="LP" AND new.useType="consumption" BEGIN   UPDATE storeAccount SET consumptionQuantity=consumptionQuantity+new.quantity,   totalUseQuantity=totalUseQuantity+new.quantity,  closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND   ID=new.ID AND  expDate=new.expDate AND  type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER LPTransferUpdate  AFTER INSERT  ON consumptionTable WHEN new.type="LP" AND new.useType="transfer" BEGIN UPDATE storeAccount SET transferQuantity=transferQuantity+new.quantity,   totalUseQuantity=totalUseQuantity+new.quantity,   closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND  ID=new.ID AND  expDate=new.expDate AND  type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER OBConsumptionUpdate  AFTER INSERT  ON consumptionTable WHEN new.type="OB" AND new.useType="consumption" BEGIN UPDATE storeAccount SET consumptionQuantity=consumptionQuantity+new.quantity,  totalUseQuantity=totalUseQuantity+new.quantity,  closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND  ID=new.ID AND expDate=new.expDate AND  type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER OBTransferUpdate  AFTER INSERT  ON consumptionTable WHEN new.type="OB" AND new.useType="transfer" BEGIN UPDATE storeAccount SET transferQuantity=transferQuantity+new.quantity,  totalUseQuantity=totalUseQuantity+new.quantity,  closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND  ID=new.ID AND  expDate=new.expDate AND  type=new.type AND  key=new.currentKey; END;');
  db.run('CREATE TRIGGER PMJAKConsumptionUpdate  AFTER INSERT  ON consumptionTable WHEN new.type="PMJAK" AND new.useType="consumption" BEGIN UPDATE storeAccount SET consumptionQuantity=consumptionQuantity+new.quantity,  totalUseQuantity=totalUseQuantity+new.quantity, closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND ID=new.ID AND expDate=new.expDate AND type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER PMJAKTransferUpdate  AFTER INSERT ON consumptionTable WHEN new.type="PMJAK" AND new.useType="transfer" BEGIN  UPDATE storeAccount SET transferQuantity=transferQuantity+new.quantity,   totalUseQuantity=totalUseQuantity+new.quantity,  closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND  ID=new.ID AND  expDate=new.expDate AND type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER RFCMSConsumptionUpdate   AFTER INSERT  ON consumptionTable WHEN new.type="RFCMS" AND new.useType="consumption" BEGIN UPDATE storeAccount SET consumptionQuantity=consumptionQuantity+new.quantity, totalUseQuantity=totalUseQuantity+new.quantity, closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND ID=new.ID AND expDate=new.expDate AND type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER RFCMSTransferUpdate AFTER INSERT ON consumptionTable WHEN new.type="RFCMS" AND new.useType="transfer" BEGIN UPDATE storeAccount SET transferQuantity=transferQuantity+new.quantity, totalUseQuantity=totalUseQuantity+new.quantity, closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND ID=new.ID AND expDate=new.expDate AND type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER RFODConsumptionUpdate  AFTER INSERT  ON consumptionTable WHEN new.type="RFOD" AND new.useType="consumption" BEGIN UPDATE storeAccount SET consumptionQuantity=consumptionQuantity+new.quantity,  totalUseQuantity=totalUseQuantity+new.quantity,  closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND  ID=new.ID AND  expDate=new.expDate AND type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER RFODTransferUpdate  AFTER INSERT  ON consumptionTable WHEN new.type="RFOD" AND new.useType="transfer" BEGIN UPDATE storeAccount SET transferQuantity=transferQuantity+new.quantity, totalUseQuantity=totalUseQuantity+new.quantity, closingQuantity=closingQuantity-new.quantity WHERE ID = new.ID; UPDATE currentTable SET quantity=quantity-new.quantity WHERE batch=new.batch AND ID=new.ID AND expDate=new.expDate AND type=new.type AND key=new.currentKey; END;');
  db.run('CREATE TRIGGER LPCorrection  AFTER UPDATE  ON currentTable WHEN new.type="LP"  BEGIN   UPDATE mainTable SET LPCurrentQuantity=LPCurrentQuantity-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE scheduleIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE emergencyIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID; END;');
  db.run('CREATE TRIGGER OBCorrection  AFTER UPDATE  ON currentTable WHEN new.type="OB"  BEGIN   UPDATE mainTable SET OBCurrentQuantity=OBCurrentQuantity-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE scheduleIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE emergencyIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID; END;');
  db.run('CREATE TRIGGER PMJAKCorrection  AFTER UPDATE  ON currentTable WHEN new.type="PMJAK"  BEGIN   UPDATE mainTable SET PMJAKCurrentQuantity=PMJAKCurrentQuantity-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE scheduleIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE emergencyIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID; END;');
  db.run('CREATE TRIGGER RFCMSCorrection  AFTER UPDATE  ON currentTable WHEN new.type="RFCMS"  BEGIN   UPDATE mainTable SET RFCMSCurrentQuantity=RFCMSCurrentQuantity-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE scheduleIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE emergencyIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID; END;');
  db.run('CREATE TRIGGER RFODCorrection  AFTER UPDATE  ON currentTable WHEN new.type="RFOD"  BEGIN   UPDATE mainTable SET RFODCurrentQuantity=RFODCurrentQuantity-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE scheduleIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID;   UPDATE emergencyIndent SET currentBalance=currentBalance-old.quantity+new.quantity WHERE ID=new.ID; END;');
  db.run('CREATE TRIGGER consumptionCorrection AFTER UPDATE  ON consumptionTable WHEN new.useType="consumption" BEGIN   UPDATE currentTable SET quantity=quantity+old.quantity-new.quantity WHERE key=new.currentKey;   UPDATE storeAccount SET consumptionQuantity=consumptionQuantity-old.quantity+new.quantity, totalUseQuantity=totalUseQuantity-old.quantity+new.quantity, closingQuantity=closingQuantity+old.quantity-new.quantity WHERE ID=new.ID; END;');
  db.run('CREATE TRIGGER transferCorrection AFTER UPDATE  ON consumptionTable WHEN new.useType="transfer" BEGIN    UPDATE currentTable SET quantity=quantity+old.quantity-new.quantity WHERE key=new.currentKey;   UPDATE storeAccount SET transferQuantity=transferQuantity-old.quantity+new.quantity, totalUseQuantity=totalUseQuantity-old.quantity+new.quantity WHERE ID=new.ID; END;'); 
}







ipcMain.on('loginData', (event, loginData) => {

  let query = "SELECT password,currentDatabase FROM AdminTable WHERE username='"+loginData.username+"';";
  
  adminDB.get(query, [], (err, row) => {
    
    if(err){
      mainWindow.webContents.send('loginResult', false);
    }
    
    else {

      if(row && row.password === loginData.password) {
        db = new sqlite3.Database('./'+row.currentDatabase+'.db');
        mainWindow.webContents.send('loginResult', true);
      }

      else {
        mainWindow.webContents.send('loginResult', false);
      }

    }

  });

})






ipcMain.on('SQ', (event, nothing) => {
  let query = "SELECT securityQue FROM AdminTable;";
  adminDB.get(query, [], (err, row) => {
    if(row){
      mainWindow.webContents.send('SQData', row.securityQue);
    }
    else{
      mainWindow.webContents.send('SQData', row);
    }
  });
});






ipcMain.on('SQAnswer', (event, answer) => {
  let query = "SELECT answer, password FROM AdminTable;";
  adminDB.get(query, [], (err, row) => {
    if(row && row.answer === answer){
      mainWindow.webContents.send('SQAnswerData',[true, row.password]);
    }
    else{
      mainWindow.webContents.send('SQAnswerData',[false]);
    }
  });
});






ipcMain.on('nameInsertion', (event, data) => {
  let query = "INSERT INTO mainTable (schNo, type, name, oldPrice, lastYearConsumption) VALUES ('"+data[1].schNo+"','"+data[1].type+"','"+data[0]+"',"+data[1].OBValue+","+data[1].lastYearConsumption+");"

  db.run(query, [], (err) => {
    if(err) {
      mainWindow.webContents.send('nameInsertionResult', false);
    }
    else{
      mainWindow.webContents.send('nameInsertionResult', true);
    }
  });
});



ipcMain.on('suggestions', (event, data) => {
  let query = "SELECT name FROM mainTable;";

  db.all(query, [], (err, rows) => {
    if(err) {
      mainWindow.webContents.send('suggestionsData',[]);
    }
    else{
      let nameList = rows.map((row) => {
        return row.name;
      });
      mainWindow.webContents.send('suggestionsData',nameList);
    }
  });
});








ipcMain.on('OB', async (event, data) => {
  try{
    let ID;

    //get ID
    let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"
    db.get(query, [], (err, row) => {
      if(err){
        ID = false
      }
  
      else{
        if(row){
          ID = row.ID;
        }         
      }
    });
    
    // time out before id comes
    setTimeout(() => {
  
      // enter ob
      query = "INSERT INTO receiveTable (ID, batch, quantity, expDate, date, type) VALUES ("+ID+",'"+data.batch+"',"+data.quantity+",'"+data.expDate+"','"+data.date+"','OB');";
      db.run(query, [], (err) => {
        if(err){
          mainWindow.webContents.send('OBResult', false);
        }
  
        // enter into register
        else{
          let info = "Opening Balance , Batch No: "+data.batch+", Expiry Date: "+data.expDate;
          let currentBalance;
  
          // get current Balance
          query= "SELECT currentBalance FROM scheduleIndent WHERE name='"+data.name+"';";
          db.get(query, [], (err, row) => {
            if(err){
              currentBalance = "NULL";
            }
            else{
              currentBalance = row.currentBalance;
            }
          });
  
          // timeout before current balance comes 
          setTimeout(() => {
  
            // run register query
            query = "INSERT INTO register (ID, date, info, income, remain) VALUES ("+ID+",'"+data.date+"','"+info+"',"+data.quantity+","+currentBalance+");";
            db.run(query, [], (err) => {
              if(err) {
                mainWindow.webContents.send('OBResult', false);
              }
              else{
                mainWindow.webContents.send('OBResult', [true, currentBalance]);
              }
            });
          }, 300);
        }
      });
    }, 300);
  }

  catch{
    mainWindow.webContents.send('OBResult', false);
  }
  
});







ipcMain.on('currentBalance', (event, data) => {
  query= "SELECT currentBalance FROM scheduleIndent WHERE name='"+data.name+"';";
  db.get(query, [], (err, row) => {
    if(err){
      mainWindow.webContents.send('currentBalanceResult',"NULL");
    }
    else{
      mainWindow.webContents.send('currentBalanceResult',row.currentBalance);
    }
  });
})

 
  




ipcMain.on('LP', async (event, data) => {
  let ID;

  try{
    //get ID
    let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"
    db.get(query, [], (err, row) => {
      if(err){
        ID = false
      }

      else{
        if(row){
          ID = row.ID;
        }
      }
    });
    
    // time out before id comes
    setTimeout(() => {

      // enter lp
      query = "INSERT INTO receiveTable (ID, batch, quantity, expDate, date, type) VALUES ("+ID+",'"+data.batch+"',"+data.quantity+",'"+data.expDate+"','"+data.date+"','LP');";
      db.run(query, [], (err) => {
        if(err){
          mainWindow.webContents.send('LPResult', false);
        }

        // enter into register
        else{
          let info = "Purchased through Local purchase, Batch No: "+data.batch+", Expiry Date: "+data.expDate;
          let currentBalance;

          // get current Balance
          query= "SELECT currentBalance FROM scheduleIndent WHERE name='"+data.name+"';";
          db.get(query, [], (err, row) => {
            if(err){
              currentBalance = "NULL";
            }
            else{
              currentBalance = row.currentBalance;
            }
          });

          // timeout before current balance comes 
          setTimeout(() => {

            // run register query
            query = "INSERT INTO register (ID, date, info, income, remain, price) VALUES ("+ID+",'"+data.date+"','"+info+"',"+data.quantity+","+currentBalance+","+data.price+");"
            db.run(query, [], (err) => {
              if(err) {
                mainWindow.webContents.send('LPResult', false);
              }
              else{
                mainWindow.webContents.send('LPResult', [true, currentBalance]);
              }
            });
          }, 300);
        }
      });
    }, 300);
  }

  catch{
    mainWindow.webContents.send('LPResult', false);
  }
  
});







ipcMain.on('PMJAK', async (event, data) => {
  let ID;

  try{
    //get ID
    let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"
    db.get(query, [], (err, row) => {
      if(err){
        ID = false
      }

      else{
        if(row) {
          ID = row.ID;
        }
       
      }
    });
    
    // time out before id comes
    setTimeout(() => {

      // enter PMJAK
      query = "INSERT INTO receiveTable (ID, batch, quantity, expDate, date, type) VALUES ("+ID+",'"+data.batch+"',"+data.quantity+",'"+data.expDate+"','"+data.date+"','PMJAK');";
      db.run(query, [], (err) => {
        if(err){
          mainWindow.webContents.send('PMJAKResult', false);
        }

        // enter into register
        else{
          let info = "Purchased through PMJAK, Batch No: "+data.batch+", Expiry Date: "+data.expDate;
          let currentBalance;

          // get current Balance
          query= "SELECT currentBalance FROM scheduleIndent WHERE name='"+data.name+"';";
          db.get(query, [], (err, row) => {
            if(err){
              currentBalance = "NULL";
            }
            else{
              currentBalance = row.currentBalance;
            }
          });

          // timeout before current balance comes 
          setTimeout(() => {

            // run register query
            query = "INSERT INTO register (ID, date, info, income, remain, price) VALUES ("+ID+",'"+data.date+"','"+info+"',"+data.quantity+","+currentBalance+","+data.price+");"
            db.run(query, [], (err) => {
              if(err) {
                mainWindow.webContents.send('PMJAKResult', false);
              }
              else{
                mainWindow.webContents.send('PMJAKResult', [true, currentBalance]);
              }
            });
          }, 300);
        }
      });
    }, 300);
  }
  
  catch {
    mainWindow.webContents.send('PMJAKResult', false);
  }
});







ipcMain.on('RFOD', async (event, data) => {
  let ID;

  try {
    //get ID
    let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"
    db.get(query, [], (err, row) => {
      if(err){
        ID = false
      }

      else{
        if(row) {
          ID = row.ID;
        }
        
      }
    });
    
    // time out before id comes
    setTimeout(() => {

      // enter rfod
      query = "INSERT INTO receiveTable (ID, batch, quantity, expDate, date, type) VALUES ("+ID+",'"+data.batch+"',"+data.quantity+",'"+data.expDate+"','"+data.date+"','RFOD');";
      db.run(query, [], (err) => {
        if(err){
          mainWindow.webContents.send('RFODResult', false);
        }

        // enter into register
        else{
          let info = "Received from "+data.disp+", Batch No: "+data.batch+", Expiry Date: "+data.expDate;
          let currentBalance;

          // get current Balance
          query= "SELECT currentBalance FROM scheduleIndent WHERE name='"+data.name+"';";
          db.get(query, [], (err, row) => {
            if(err){
              currentBalance = "NULL";
            }
            else{
              currentBalance = row.currentBalance;
            }
          });

          // timeout before current balance comes 
          setTimeout(() => {

            // run register query
            query = "INSERT INTO register (ID, date, info, income, remain) VALUES ("+ID+",'"+data.date+"','"+info+"',"+data.quantity+","+currentBalance+");"
            db.run(query, [], (err) => {
              if(err) {
                mainWindow.webContents.send('RFODResult', false);
              }
              else{
                mainWindow.webContents.send('RFODResult', [true, currentBalance]);
              }
            });
          }, 300);
        }
      });
    }, 300);
  }

  catch{
    mainWindow.webContents.send('RFODResult', false);
  }

});






ipcMain.on('consumption', (event, data) => {

  let ID;
  try {
    //get ID
    let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"
    db.get(query, [], (err, row) => {
      if(err){
        ID = false
      }

      else{
        if(row) {
          ID = row.ID;
      }
        
      }
    });

    let output;
    setTimeout(() => {
      let query2 = "SELECT * FROM currentTable WHERE ID="+ID+" AND quantity>0 ORDER BY date(expDate) ;";
      db.all(query2, [], (err, rows) => {
        if(err){
          output = [];
        }
        else{
          output = rows.map((row) => {
            return [row.key, row.ID, row.batch, row.quantity, row.expDate, row.date, row.type];
          });
        }
      })
    }, 300);


    let totalQty = data.quantity;
    i = 0;

  setTimeout(() => {
    let flag = true
    while(data.quantity > 0){
      if(data.quantity >= output[i][3]){
        let query3 = "INSERT INTO consumptionTable (ID, batch, quantity, expDate, date, type, useType, currentKey) VALUES ("+output[i][1]+",'"+output[i][2]+"',"+output[i][3]+",'"+output[i][4]+"','"+data.useDate+"','"+output[i][6]+"','consumption',"+output[i][0]+");";
        db.run(query3, [], (err) => {
          if(err){
            flag = false;
          }
        });
        data.quantity = data.quantity - output[i][3];
        i=i+1;
      }
      
      else{
        let query3 = "INSERT INTO consumptionTable (ID, batch, quantity, expDate, date, type, useType, currentKey) VALUES ("+output[i][1]+",'"+output[i][2]+"',"+data.quantity+",'"+output[i][4]+"','"+data.useDate+"','"+output[i][6]+"','consumption',"+output[i][0]+");";
        db.run(query3, [], (err) => {
          if(err){
            flag = false;
          }
        });
        data.quantity = 0;
        break;
      }
    };

    let currentBalance;
    let query4 = "SELECT currentBalance FROM scheduleIndent WHERE name='"+data.name+"';";
    db.get(query4, [], (err, row) => {
      if(err){
        currentBalance = "NULL";
      }
      else{
        currentBalance = row.currentBalance;
      }
    });

    setTimeout(() => {
      let query5 = "INSERT INTO register (ID, date, info, use, remain) VALUES ("+ID+",'"+data.useDate+"','Consumption in OPD',"+totalQty+","+currentBalance+");";

      db.run(query5, []);

      if(flag) {
        mainWindow.webContents.send('consumptionResult', [true, currentBalance]);
      }
    
      else {
        mainWindow.webContents.send('consumptionResult', false);
      }
    }, 300);

    }, 600);
  }
  
  catch {
    mainWindow.webContents.send('consumptionResult', false);
  }
});







ipcMain.on('EI', (event, data) => {
  let query = "SELECT ID,name,schNo,bufferStock,currentBalance FROM emergencyIndent WHERE currentBalance < bufferStock;";
  db.all(query, [], (err, rows) =>{
    if(err) {
      mainWindow.webContents.send('EIData',[]);
    }
    else {
      mainWindow.webContents.send('EIData',rows);
    }
  });
});







ipcMain.on('closeExp', (event, data) => {
  let query = "SELECT expDate FROM currentTable WHERE ID="+data+" AND quantity>0 ORDER BY date(expDate);";
  db.get(query, [], (err, row) => {
    if(err) {
      mainWindow.webContents.send('closeExpData',[false]);
    }

    else{
      if(row){
        mainWindow.webContents.send('closeExpData',[true, row.expDate]);
      }
      else{
        mainWindow.webContents.send('closeExpData',[true, "None"]);
      }
    }
  });
});







ipcMain.on('Indent', (event, data) => {
  let query = "UPDATE "+data[2]+"Indent SET requirement="+data[1]+" WHERE name='"+data[0]+"';"
  db.run(query, [], (err) => {
    if(err) {
      mainWindow.webContents.send('indentResult', false);
    }
    else {
      mainWindow.webContents.send('indentResult', true);
    }
  }); 
});







ipcMain.on('BI', (event, data) => {
  let query = "SELECT ID,name,schNo,bufferStock,currentBalance FROM scheduleIndent WHERE currentBalance < bufferStock;";
  db.all(query, [], (err, rows) =>{
    if(err) {
      mainWindow.webContents.send('BIData',[]);
    }
    else {
      mainWindow.webContents.send('BIData',rows);
    }
  });
});




 



ipcMain.on('RFCMSList', (event, data) => {
  let query = "SELECT ID,name,requirement FROM "+data+"Indent WHERE requirement>0;"
  db.all(query, [], (err, rows) =>{
    if(err) {
      mainWindow.webContents.send('RFCMSData',[]);
    }
    else {
      mainWindow.webContents.send('RFCMSData',rows);
    }
  });
});







ipcMain.on('RFCMS', async (event, data) => {
  let ID;

  try {
    //get ID
    let query= "SELECT ID FROM mainTable WHERE name='"+ data[1].data.name+"';"
    db.get(query, [], (err, row) => {
      if(err){
        ID = false
      }

      else{
        if(row) {
          ID = row.ID;
        }
      }
    });
    
    // time out before id comes
    setTimeout(() => {

      // enter rfcms
      query = "INSERT INTO receiveTable (ID, batch, quantity, expDate, date, type) VALUES ("+ID+",'"+data[0].batch+"',"+data[0].quantity+",'"+data[0].expDate+"','"+data[0].date+"','RFCMS');";
      db.run(query, [], (err) => {
        if(err){
          mainWindow.webContents.send('RFCMSResult', false);
        }

        // enter into register
        else{
          let info = "Received from CMS, Batch No: "+data[0].batch+", Expiry Date: "+data[0].expDate;
          let currentBalance;

          // get current Balance
          query= "SELECT currentBalance FROM scheduleIndent WHERE name='"+data[1].data.name+"';";
          db.get(query, [], (err, row) => {
            if(err){
              currentBalance = "NULL";
            }
            else{
              currentBalance = row.currentBalance;
            }
          });

          query = "UPDATE "+data[1].indent+"Indent SET requirement=0 WHERE name='"+data[1].data.name+"';"
          db.run(query, []);

          // timeout before current balance comes 
          setTimeout(() => {

            // run register query
            query = "INSERT INTO register (ID, date, info, income, remain) VALUES ("+ID+",'"+data[0].date+"','"+info+"',"+data[0].quantity+","+currentBalance+");"
            db.run(query, [], (err) => {
              if(err) {
                mainWindow.webContents.send('RFCMSResult', false);
              }
              else{
                mainWindow.webContents.send('RFCMSResult', [true, currentBalance]);
              }
            });
          }, 300);
        }
      });
    }, 300);
  }
  
  catch {
    mainWindow.webContents.send('RFCMSResult', false);
  }
});







    
ipcMain.on('transfer', (event, data) => {
  
    let ID;
    let quantity;
    let type;
    let key;
    let currentBalance;

    let query = "SELECT ID FROM mainTable WHERE name='"+ data.name+"';";
    db.get(query, [], (err, row) => {
      if(err) {
        ID = false
      }
      else {
        if(row){
          ID = row.ID;
        }
        let query2 = "SELECT quantity FROM currentTable WHERE batch='"+data.batch+"' AND ID="+ID+";";
        let query3 = "SELECT type FROM currentTable WHERE batch='"+data.batch+"' AND ID="+ID+";";
        let query4 = "SELECT key FROM currentTable WHERE batch='"+data.batch+"' AND ID="+ID+";";

        db.get(query2, [], (err, row) => {
          if(err) {
            mainWindow.webContents.send('transferResult', false)
          }
          else{
            quantity = row.quantity;
            db.get(query3, [], (err, row) => {
              if(err) {
                mainWindow.webContents.send('transferResult', false)
              }
              else{
                type = row.type;
                db.get(query4, [], (err, row) => {
                  if(err) {
                    mainWindow.webContents.send('transferResult', false)
                  }
                  else{
                    key = row.key;
                    if(quantity < data.quantity){
                      mainWindow.webContents.send('transferResult', false)
                    }
                    else{
                      let query5 = "INSERT INTO consumptionTable (ID, batch, quantity, expDate, date, type, useType, currentKey) VALUES ("+ID+",'"+data.batch+"',"+data.quantity+",'"+data.expDate+"','"+data.date+"','"+type+"','transfer',"+key+");";
                      db.run(query5, [], (err) => {
                        if(err) {
                          mainWindow.webContents.send('transferResult', false)
                        }
                        else{
                          let info = "Transfered to other disp. , Batch No: "+data.batch+", Expiry Date: "+data.expDate;
                          let query6 = "SELECT currentBalance FROM scheduleIndent WHERE name='"+data.name+"';";
                          db.get(query6, [], (err, row) => {
                            if(err) {
                              mainWindow.webContents.send('transferResult', false)
                            }
                            else{
                              currentBalance = row.currentBalance;
                              let query7 = "INSERT INTO register (ID, date, info, use, remain) VALUES ("+ID+",'"+data.date+"','"+info+"',"+data.quantity+","+currentBalance+");";
                              db.run(query7, [], (err) => {
                                if(err){
                                  mainWindow.webContents.send('transferResult', false)
                                }
                                else{
                                  mainWindow.webContents.send('transferResult', [true,currentBalance])
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  }
                })
              }
            })
          }
        })
      }

    });

});
        




ipcMain.on('EIPDF', (event, data) => {
  let date = data.date[8]+data.date[9]+"-"+data.date[5]+data.date[6]+"-"+data.date[0]+data.date[1]+data.date[2]+data.date[3];
  let month = data.date[5]+data.date[6]+"-"+data.date[0]+data.date[1]+data.date[2]+data.date[3];
  let name = data.name;
  let indent = data.indent;
  let query = "SELECT * FROM emergencyIndent WHERE requirement>0 ORDER BY ID;";
  db.all(query, [], (err, rows) => {
    if(err){
      mainWindow.webContents.send('EIPDFResult', false);
    }
    else {
      let data = [];
      if(rows) {
        for(let i=0; i<rows.length; i++) {
          let temp = [rows[i].schNo, i+1, rows[i].name, rows[i].lastYearConsumption, rows[i].bufferStock, rows[i].currentBalance, rows[i].requirement, "", "", "", "", "", "", "", "", "", "", ""];
          data.push(temp);
        }
      }

      var docDefinition = {
        // a string or { width: number, height: number }
        pageSize: 'LEGAL',
      
        header: {
          table: {
            widths: [998],
            body: [
              [{columns: [
                {text: disp+' \n\n\n\n NUMBER OF IP:2530', width: 340, fontSize:14},
                { text: 'EMPLOYEE STATE INSURANCE SCHEME \n\n INDENT FORM TO RECEIVE MEDICINE FROM CMS \n\n MONTH: '+month+' \t EMERGENCY INDENT', width: '*', fontSize:14 },
                { text: 'SPECIAL E.S.I.S 54 \n\n INDENT NO.:'+indent+' \n\n DATE: '+date,  width: '*' ,alignment:'right', fontSize:14},   
              ]}],
              [{table: {
                widths:[50, 30, 125, 40, 40,40,40,40,40,50,60,40,45,70,42,42,50],
                body: [
                  ['SCH NO.', 'SR NO.', 'NAME OF MEDICINE', 'REAL CONS. OF LAST YEAR', 'AS PER COL.3 BUF.+2 MONTH REQ.','BAL. ON HAND', 'REQ.', 'STOCK SENC. BY CMS', 'BRAND NAME', 'NAME OF COMP.', 'BATCH NO.', 'MANU. DATE','EXP. DATE', 'DATE OF BOOK NO. AND PAGE NO. OF CMS/DISP. LEDGER', 'SIGN OF PHARMA.', 'SIGN OF IMO OF CMS', 'REMARK'],
                ]
              }}]
            ]
          }
        },
        
      
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',
      
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 0, 185, 0, 40 ],
      
        content: [
          {table: {
            widths: [998],
            body: [
              [{table: {
                widths:[50, 30, 125, 40, 40,40,40,40,40,50,60,40,45,30,33,42,42,50],
                body: data
              }}]
            ]
          }}
        ]
        
      };
      
      var pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(desktopDir+'/'+name+'.pdf'));
      pdfDoc.end();
      mainWindow.webContents.send('EIPDFResult', true);
    }
  })
})





ipcMain.on('BIPDF', (event, data) => {
  let date = data.date[8]+data.date[9]+"-"+data.date[5]+data.date[6]+"-"+data.date[0]+data.date[1]+data.date[2]+data.date[3];
  let month = data.date[5]+data.date[6]+"-"+data.date[0]+data.date[1]+data.date[2]+data.date[3];
  let name = data.name;
  let indent = data.indent;
  let query = "SELECT * FROM scheduleIndent WHERE requirement>0 ORDER BY ID;";
  db.all(query, [], (err, rows) => {
    if(err){
      mainWindow.webContents.send('BIPDFResult', false);
    }
    else {
      let data = [];

      if(rows !== []) {
        for(let i=0; i<rows.length; i++) {
          let temp = [rows[i].schNo, i+1, rows[i].name, rows[i].lastYearConsumption, rows[i].bufferStock, rows[i].currentBalance, rows[i].requirement, "", "", "", "", "", "", "", "", "", "", ""];
          data.push(temp);
        }
      }

      var docDefinition = {
        // a string or { width: number, height: number }
        pageSize: 'LEGAL',
      
        header: {
          table: {
            widths: [998],
            body: [
              [{columns: [
                {text: disp+' \n\n\n\n NUMBER OF IP:2530', width: 340, fontSize:14},
                { text: 'EMPLOYEE STATE INSURANCE SCHEME \n\n INDENT FORM TO RECEIVE MEDICINE FROM CMS \n\n MONTH: '+month+' \t BI-MONTHLY INDENT', width: '*', fontSize:14 },
                { text: 'SPECIAL E.S.I.S 54 \n\n INDENT NO.:'+indent+'\t \n\n DATE: '+date,  width: '*' ,alignment:'right', fontSize:14},   
              ]}],
              [{table: {
                widths:[50, 30, 125, 40, 40,40,40,40,40,50,60,40,45,70,42,42,50],
                body: [
                  ['SCH NO.', 'SR NO.', 'NAME OF MEDICINE', 'REAL CONS. OF LAST YEAR', 'AS PER COL.3 BUF.+2 MONTH REQ.','BAL. ON HAND', 'REQ.', 'STOCK SENC. BY CMS', 'BRAND NAME', 'NAME OF COMP.', 'BATCH NO.', 'MANU. DATE','EXP. DATE', 'DATE OF BOOK NO. AND PAGE NO. OF CMS/DISP. LEDGER', 'SIGN OF PHARMA.', 'SIGN OF IMO OF CMS', 'REMARK'],
                ]
              }}]
            ]
          }
        },
        
      
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',
      
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 0, 185, 0, 40 ],
      
        content: [
          {table: {
            widths: [998],
            body: [
              [{table: {
                widths:[50, 30, 125, 40, 40,40,40,40,40,50,60,40,45,30,33,42,42,50],
                body: data
              }}]
            ]
          }}
        ]
        
      };
      
      var pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(desktopDir+'/'+name+'.pdf'));
      pdfDoc.end();
      mainWindow.webContents.send('BIPDFResult', true);
    }
  })
})








ipcMain.on('SA', (event, date) => {
  let ID;
  

  let query= "SELECT ID FROM mainTable WHERE name='"+ date.name+"';"
    db.get(query, [], (err, row) => {
      if(err){
        ID = false
      }

      else{
        if(row) {
          ID = row.ID;
        }

        let query2 = "UPDATE mainTable SET newPrice="+date.price+" WHERE ID="+ID+";"
        db.run(query2, [], (err) => {
          if(err) {
            mainWindow.webContents.send('SAResult', false);
          }
          else{
            let data1;
            let data2;
            let query3 = "SELECT oldPrice,OBCurrentQuantity,RFCMSCurrentQuantity,RFODCurrentQuantity FROM mainTable WHERE name='"+date.name+"';";
            db.get(query3, [], (err, row) => {
              if(err){
                mainWindow.webContents.send('SAResult', false);
              }

              else{
                if(row){
                  data1 = [row.oldPrice, row.OBCurrentQuantity, row.RFCMSCurrentQuantity, row.RFODCurrentQuantity];
                  let query4 = "SELECT * FROM storeAccount WHERE name='"+date.name+"';";
                  db.get(query4, [], (err, row) => {
                    if(err){
                      mainWindow.webContents.send('SAResult', false);
                    }
                    else{
                      data2 = [row.ID, row.name, row.OBQuantity, row.OBValue, row.RFODQuantity, row.RFODValue, row.RFCMSQuantity, row.RFCMSValue, row.LPQuantity, row.LPValue, row.PMJAKQuantity, row.PMJAKValue, row.totalRecieveQuantity, row.totalRecieveValue, row.consumptionQuantity, row.consumptionValue, row.transferQuantity, row.transferValue, row.totalUseQuantity, row.totalUseValue, row.closingQuantity, row.closingValue]
                      
                      let data= [data1, data2];

                      
                      let RFCMSValue = data[1][6]*parseFloat(date.price)
                      let RFODValue = data[1][4]*parseFloat(date.price)
                      let transferValue = data[1][16]*parseFloat(date.price)
                      let totalReceiveValue = data[1][3]+RFCMSValue+RFODValue
                      if(data[1][3] !== 0){
                        var closingValue = (data[0][1]*(data[1][2]/data[1][3]))+(data[0][2]*parseFloat(date.price))+(data[0][3]*parseFloat(date.price))
                      }
                      else{
                        var closingValue = (data[0][1]*(data[1][2]/1.0))+(data[0][2]*parseFloat(date.price))+(data[0][3]*parseFloat(date.price))
                      }
                      let totalUseValue = totalReceiveValue - closingValue
                      let consumptionValue = totalUseValue - transferValue

                      let query5 = "UPDATE storeAccount SET RFCMSValue="+RFCMSValue+", RFODValue="+RFODValue+", transferValue="+transferValue+", totalRecieveValue="+totalReceiveValue+", closingValue="+closingValue+", totalUseValue="+totalUseValue+", consumptionValue="+consumptionValue+" WHERE ID="+ID+";"
                      db.run(query5, [], (err) => {
                        if(err){
                          mainWindow.webContents.send('SAResult', false);
                        }
                        else{
                          mainWindow.webContents.send('SAResult', true);
                        }
                      })
                    }
                  })
                  
                }
              }
            })
          }
        }) 
      }
    });
})










ipcMain.on('SAPDF', (event, data) => {
  let date = data.date[8]+data.date[9]+"-"+data.date[5]+data.date[6]+"-"+data.date[0]+data.date[1]+data.date[2]+data.date[3];
  let month = data.date[5]+data.date[6]+"-"+data.date[0]+data.date[1]+data.date[2]+data.date[3];
  let name = data.name;
  let indent = data.indent;
  let query = "SELECT * FROM storeAccount WHERE totalRecieveValue>0 ORDER BY ID;";
  db.all(query, [], (err, row) => {
    if(err){
      mainWindow.webContents.send('SAPDFResult', false);
    }
    else {
      let data = [];
      let t = ['', 'TOTAL', 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, 0,0]

     
    for(let i=0; i<row.length; i++) {
      let temp = [i+1, row[i].name, row[i].OBQuantity, row[i].OBValue, row[i].RFODQuantity, row[i].RFODValue, row[i].RFCMSQuantity, row[i].RFCMSValue, row[i].LPQuantity+row[i].PMJAKQuantity, row[i].LPValue+row[i].PMJAKValue, row[i].totalRecieveQuantity, row[i].totalRecieveValue, row[i].consumptionQuantity, row[i].consumptionValue, row[i].transferQuantity, row[i].transferValue, row[i].totalUseQuantity, row[i].totalUseValue, row[i].closingQuantity, row[i].closingValue];
      data.push(temp)
      t[2] += row[i].OBQuantity;
      t[3] += row[i].OBValue;
      t[4] += row[i].RFODQuantity;
      t[5] += row[i].RFODValue;
      t[6] += row[i].RFCMSQuantity;
      t[7] += row[i].RFCMSValue;
      t[8] = t[8]+row[i].LPQuantity+row[i].PMJAKQuantity;
      t[9] = t[9]+row[i].LPValue+row[i].PMJAKValue;
      t[10] += row[i].totalRecieveQuantity;
      t[11] += row[i].totalRecieveValue;
      t[12] += row[i].consumptionQuantity;
      t[13] += row[i].consumptionValue;
      t[14] += row[i].transferQuantity;
      t[15] += row[i].transferValue;
      t[16] += row[i].totalUseQuantity;
      t[17] += row[i].totalUseValue;
      t[18] += row[i].closingQuantity;
      t[19] += row[i].closingValue;
      }

      data.push(t);

      var docDefinition = {
        // a string or { width: number, height: number }
        pageSize: 'LEGAL',
      
        header: {
          table: {
            widths: [998],
            body: [
              [{columns: [
                {text: '', width: 340, fontSize:14},
                { text: 'EMPLOYEE STATE INSURANCE SCHEME \n\n STORE ACCOUNT'+dataBase+' \n\n  '+disp+' \t BI-MONTHLY INDENT', width: '*', fontSize:14 },
                { text: '',  width: '*' ,alignment:'right', fontSize:14},   
              ]}],
              [{table: {
                widths:[30, 185,75,75,75,75,75,85,75,75,75],
                body: [
                  [{text:'SR. NO.', alignment:'center', border:[true, true]}, {text:'NAME OF MEDICINE', alignment:'center', border:[true, true]}, {text:"OPENING BALANCE", alignment:'center'}, {text:"REC. FROM OTHER DISP.", alignment:'center'},{text:"REC. FROM CMS", alignment:'center'}, {text:"LOCAL PURCHASE", alignment:'center'}, {text:"TOTAL RECEIVE", alignment:'center'}, {text:"CONSUMPTION", alignment:'center'}, {text:"TRANSFER", alignment:'center'},{text:"TOTAL USED", alignment:'center'},{text:"CLOSING", alignment:'center'}],
                  [{text:'', border:[true,false, true, true]},{text:'', border:[true,false, true, true]}, {table: {widths:[29,29],body: [['QTY.',  'VAL.']]}}, {table: {widths:[29,29],body: [['QTY.',  'VAL.']]}},{table: {widths:[29,29],body: [['QTY.',  'VAL.']]}}, {table: {widths:[29,29],body: [['QTY.',  'VAL.']]}}, {table: {widths:[29,29],body: [['QTY.',  'VAL.']]}}, {table: {widths:[34,34],body: [['QTY.',  'VAL.']]}}, {table: {widths:[29,29],body: [['QTY.',  'VAL.']]}},{table: {widths:[29,29],body: [['QTY.',  'VAL.']]}},{table: {widths:[29,29],body: [['QTY.',  'VAL.']]}}]
                ]
              }}]
            ]
          }
        },
        
      
        // by default we use portrait, you can change it to landscape if you wish
        pageOrientation: 'landscape',
      
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [ 0, 155, 0, 40 ],
      
        content: [
          {table: {
            widths: [998],
            body: [
              [{table: {
                widths:[30, 185, 33, 33, 33,33, 33, 33, 33, 33, 33, 33, 37, 37, 33, 33, 33, 33, 33, 33],
                body: data
              }}]
            ]
          }}
        ]
        
      };
      
      var pdfDoc = printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(desktopDir+'/'+name+'.pdf'));
      pdfDoc.end();
      mainWindow.webContents.send('SAPDFResult', true);
     }
   })
})











ipcMain.on('CS', (event, data) => {

  let ID;

  let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"

  db.get(query, [], (err, row) => {
    if(err){
      mainWindow.webContents.send("CSResult", false);
    }
    else{
      if(row){
        ID = row.ID;

        let query2 = "SELECT * FROM currentTable WHERE ID="+ID+" AND quantity>0;"
        db.all(query2, [], (err, rows) => {
          if(err){
            mainWindow.webContents.send("CSResult", false);
          }
          else{
            if(rows){
              pdfData = [];

              for(let i=0; i<rows.length; i++){
                let temp = [i+1, rows[i].batch];
                let date = rows[i].expDate;
                date = date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
                temp.push(date);
                temp.push(rows[i].quantity);
                date = rows[i].date;
                date = date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
                temp.push(date);
                temp.push(rows[i].type);
                pdfData.push(temp);
              }

              var docDefinition = {
                // a string or { width: number, height: number }
                pageSize: 'A4',
              
                header: {
                  table: {
                    widths: [585],
                    body: [
                      [{columns: [
                        { text: 'CURRENT STOCK \n\n NAME: '+data.name+'\n\n   \t ', width: '*', fontSize:14 , alignment:'center'},  
                      ]}],
                      [{table: {
                        widths:[30, 150,100,70,100,80],
                        body: [
                          [{text:'SR. NO.', alignment:'center'},{text:'BATCH NO.', alignment:'center'},{text:'EXP. DATE', alignment:'center'},{text:'QUANTITY', alignment:'center'},{text:'REC. DATE', alignment:'center'},{text:'TYPE', alignment:'center'}]
                          ]
                      }}]
                    ]
                  }
                },
                          
                // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                pageMargins: [ 0, 130, 0, 40 ],
              
                content: [
                  {
                    table: {
                      widths: [585],
                      body: [
                        [{table: {
                          widths:[30, 150,100,70,100,80],
                          body: pdfData
                        }}]
                      ]
                    }
                  }
                ]
                
              };
              
              var pdfDoc = printer.createPdfKitDocument(docDefinition);
              pdfDoc.pipe(fs.createWriteStream(desktopDir+'/'+data.pdf+'.pdf'));
              pdfDoc.end();
              mainWindow.webContents.send('CSResult', true);
            }
          }
        })
      }
    }
  })
})










ipcMain.on('TR', (event, data) => {

  let ID;

  let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"

  db.get(query, [], (err, row) => {
    if(err){
      mainWindow.webContents.send("TRResult", false);
    }
    else{
      if(row){
        ID = row.ID;

        let query2 = "SELECT * FROM receiveTable WHERE ID="+ID+" AND quantity>0;"
        db.all(query2, [], (err, rows) => {
          if(err){
            mainWindow.webContents.send("TRResult", false);
          }
          else{
            if(rows){
              pdfData = [];

              for(let i=0; i<rows.length; i++){
                let temp = [i+1, rows[i].batch];
                let date = rows[i].expDate;
                date = date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
                temp.push(date);
                temp.push(rows[i].quantity);
                date = rows[i].date;
                date = date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
                temp.push(date);
                temp.push(rows[i].type);
                pdfData.push(temp);
              }

              var docDefinition = {
                // a string or { width: number, height: number }
                pageSize: 'A4',
              
                header: {
                  table: {
                    widths: [585],
                    body: [
                      [{columns: [
                        { text: 'RECEIVED STOCK \n\n NAME: '+data.name+'\n\n   \t ', width: '*', fontSize:14 , alignment:'center'},  
                      ]}],
                      [{table: {
                        widths:[30, 150,100,70,100,80],
                        body: [
                          [{text:'SR. NO.', alignment:'center'},{text:'BATCH NO.', alignment:'center'},{text:'EXP. DATE', alignment:'center'},{text:'QUANTITY', alignment:'center'},{text:'REC. DATE', alignment:'center'},{text:'TYPE', alignment:'center'}]
                          ]
                      }}]
                    ]
                  }
                },
                          
                // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                pageMargins: [ 0, 130, 0, 40 ],
              
                content: [
                  {
                    table: {
                      widths: [585],
                      body: [
                        [{table: {
                          widths:[30, 150,100,70,100,80],
                          body: pdfData
                        }}]
                      ]
                    }
                  }
                ]
                
              };
              
              var pdfDoc = printer.createPdfKitDocument(docDefinition);
              pdfDoc.pipe(fs.createWriteStream(desktopDir+'/'+data.pdf+'.pdf'));
              pdfDoc.end();
              mainWindow.webContents.send('TRResult', true);
            }
          }
        })
      }
    }
  })
})











ipcMain.on('TC', (event, data) => {

  let ID;

  let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"

  db.get(query, [], (err, row) => {
    if(err){
      mainWindow.webContents.send("TCResult", false);
    }
    else{
      if(row){
        ID = row.ID;

        let query2 = "SELECT * FROM consumptionTable WHERE ID="+ID+" AND quantity>0;"
        db.all(query2, [], (err, rows) => {
          if(err){
            mainWindow.webContents.send("TCResult", false);
          }
          else{
            if(rows){
              pdfData = [];

              for(let i=0; i<rows.length; i++){
                let temp = [i+1, rows[i].batch];
                let date = rows[i].expDate;
                date = date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
                temp.push(date);
                temp.push(rows[i].quantity);
                date = rows[i].date;
                date = date[8]+date[9]+date[7]+date[5]+date[6]+date[4]+date[0]+date[1]+date[2]+date[3];
                temp.push(date);
                temp.push(rows[i].useType);
                pdfData.push(temp);
              }

              var docDefinition = {
                // a string or { width: number, height: number }
                pageSize: 'A4',
              
                header: {
                  table: {
                    widths: [585],
                    body: [
                      [{columns: [
                        { text: 'CONSUMPED STOCK \n\n NAME: '+data.name+'\n\n   \t ', width: '*', fontSize:14 , alignment:'center'},  
                      ]}],
                      [{table: {
                        widths:[30, 150,100,70,100,80],
                        body: [
                          [{text:'SR. NO.', alignment:'center'},{text:'BATCH NO.', alignment:'center'},{text:'EXP. DATE', alignment:'center'},{text:'QUANTITY', alignment:'center'},{text:'REC. DATE', alignment:'center'},{text:'TYPE', alignment:'center'}]
                          ]
                      }}]
                    ]
                  }
                },
                          
                // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
                pageMargins: [ 0, 130, 0, 40 ],
              
                content: [
                  {
                    table: {
                      widths: [585],
                      body: [
                        [{table: {
                          widths:[30, 150,100,70,100,80],
                          body: pdfData
                        }}]
                      ]
                    }
                  }
                ]
                
              };
              
              var pdfDoc = printer.createPdfKitDocument(docDefinition);
              pdfDoc.pipe(fs.createWriteStream(desktopDir+'/'+data.pdf+'.pdf'));
              pdfDoc.end();
              mainWindow.webContents.send('TCResult', true);
            }
          }
        })
      }
    }
  })
})









ipcMain.on('currentStock', (event, data) => {
  let ID;

  let query= "SELECT ID FROM mainTable WHERE name='"+ data.name+"';"

  db.get(query, [], (err, row) => {
    if(err){
      mainWindow.webContents.send("currentStockResult", false);
    }
    else{
      if(row){
        ID = row.ID;

        let query2 = "SELECT * FROM currentTable WHERE ID="+ID+" AND quantity>0;"
        db.all(query2, [], (err, rows) => {
          if(err){
            mainWindow.webContents.send("currentStockResult", false);
          }
          else{
            if(rows){
              mainWindow.webContents.send('currentStockResult', rows);
            }
            else{
              mainWindow.webContents.send("currentStockResult", false);
            }
          }
        })
      }
    }
  })
})



ipcMain.on('NDB', (event, data) => {
  
  let query = "SELECT * FROM mainTable ORDER BY ID;";
  let query2 = "SELECT consumptionQuantity,closingValue FROM storeAccount ORDER BY ID;";
  let query3 = "SELECT ID,batch,quantity,expDate FROM currentTable WHERE quantity>0;";
  var mainTable = [];
  var storeAccount = [];
  var currentTable = [];

  db.all(query, [], (err, rows) => {
    if(err){
      mainWindow.webContents.send('NDBResult', false);
    }
    else{
      mainTable = rows;
    }
  });

  db.all(query2, [], (err, rows) => {
    if(err){
      mainWindow.webContents.send('NDBResult', false);
    }
    else{
      storeAccount = rows;
    }
  });

  db.all(query3, [], (err, rows) => {
    if(err){
      mainWindow.webContents.send('NDBResult', false);
    }
    else{
      currentTable = rows;
    }
  });

  setTimeout(() => {
    firstYear = new Date().getFullYear();
    secondYear = firstYear + 1;
    dataBaseName = firstYear.toString()+"-"+secondYear.toString()+"11";
    db = new sqlite3.Database('./'+dataBaseName+'.db');
    let query9 = "UPDATE AdminTable SET currentDatabase='"+dataBaseName+"', totalDatabase=totalDatabase+1;";
    adminDB.run(query9)
  
    tables();
    setTimeout(triggers, 3000);
  
    setTimeout(() => {
      for(let i=0; i<mainTable.length; i++){
        let query5 = "INSERT INTO mainTable (schNo, type, name, oldPrice, lastYearConsumption) VALUES ('"+mainTable[i].schNo+"','"+mainTable[i].type+"','"+mainTable[i].name+"',"+storeAccount[i].closingValue+","+storeAccount[i].consumptionQuantity+");"
        db.run(query5, []);
      }
      for(let i=0; i<currentTable.length; i++){
        let query6 = "INSERT INTO receiveTable (ID, batch, quantity, expDate, date, type) VALUES ("+currentTable[i].ID+",'"+currentTable[i].batch+"',"+currentTable[i].quantity+",'"+currentTable[i].expDate+"','"+data.date+"','OB');";
        db.run(query6, []);

        let info = "Opening Balance , Batch No: "+currentTable[i].batch+", Expiry Date: "+currentTable[i].expDate;
        var currentBalance;
        var name;
        let query7 = "SELECT name FROM mainTable WHERE ID="+currentTable[i].ID+";";
        db.get(query7, [], (err, row) => {
          if(err){
            
          }
          else{
            if(row){
              name = row.name;
              
            }
          }
        });

        setTimeout(() => {
          let query8= "SELECT currentBalance FROM scheduleIndent WHERE name='"+name+"';";
          
          db.get(query8, [], (err, row) => {
            if(err){
  
            }
            else{
              if(row){
              currentBalance = row.currentBalance;
              }
            }
          });

          setTimeout(() => {
            query9 = "INSERT INTO register (ID, date, info, income, remain) VALUES ("+currentTable[i].ID+",'"+data.date+"','"+info+"',"+currentTable[i].quantity+","+currentBalance+");";
            
            db.run(query9, [], (err) => {
            if(err) {
              mainWindow.webContents.send('NDBResult', false);
            }
          });
          },600)
          
        },300)
      }
    },5000)

    
    mainWindow.webContents.send('NDBResult', true);
  }, 600);
  
});




