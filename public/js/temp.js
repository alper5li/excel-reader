let sheet_data = empty();
let myModal = new bootstrap.Modal(document.querySelector("#isOk"));
let isDocumentEdited = false;

function get(value){
  return document.getElementById(value);
}

function rowNames() 
{
  return sheet_data[0];
}

function AssignInner(value1,value2){
  document.getElementById(value1).innerHTML = value2;
}

function returnInner(value)
{
  return document.getElementById(value).innerHTML;
}

function onloadFunc() {
    get("uploadButton").style.visibility ="hidden";
    get("uploadButton").style.backgroundColor = "blue";
}

const fileExtensions = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
];

function empty()
{
  return "";
}

function checkTheFileIsXLS(file, event) {
  if (!fileExtensions.includes(event.target.files[0].type)) {
    alert(
      "[Uyarı] : Yalnızca .xlsx veya .xls dosya formatı desteklenmektedir."
    );
    //document.getElementById('excel_data') = '<div class="alert alert-danger">[Uyarı] : Yalnızca .xlsx veya .xls dosya formatı desteklenmektedir.</div>';
    file.value = "";
    return false;
  }
}

function EventListener(element,event,func)
{
  get(element).addEventListener(event,func);
}

function headerForSubmit(){
  return `
  <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
           <span aria-hidden="true">&times;</span>
      </button>
  </div>
  <div class="modal-body">
      <form class="form-inline">
`;
}

function createLabel(rowName)
{
  return `
  <div class="form-group mb-2">
      <input type="text" disabled readonly class="form-control-plaintext" value="${rowName}"/>
  </div>
`;
}

function createInput(cell,count)
{
  return `
  <div class="form-group mx-sm-3 mb-2"> 
      <label for="${cell}" id="v-${count}" class="sr-only">${cell}</label>
      <input type="text" class="form-control" id="value-${count}" placeholder="${cell}"/>
  </div>
`;
}

function createButtons(value)
{
  return `<div id="C_R" style="display: none;">${value}</div>
  </form>
  </div>
  <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Vazgeç</button>
      <button onclick="saveData(${value})" id="save_button" type="button" class="btn btn-primary">Kaydet</button>
  </div>`;
}

function CellID(index,rowName)
{
  return (`${index}[${rowName}]`);
}

// edit butonundan sonra çıkan menü //
function editFormMenu(index) {

    let rowNameList = rowNames();
    let editMenu = headerForSubmit(); // header orowluşturuldu.
    
    rowNameList.forEach(row => 
    {
      let rowCount = rowNameList.indexOf(row);
      let rowName = row;
      let cell_ID = CellID(index,rowName);
      let cell_Value = returnInner(cell_ID);

      editMenu +=  createLabel(rowName);   
      editMenu += createInput(cell_Value,rowCount);  
    });
  editMenu += createButtons(index);
  AssignInner("modal-content",editMenu);
}

function controlIsEmpty (element)
{
  return element === empty();
}

function InputValueAtEditForm(rowNumber)
{
  return get(`value-${rowNumber}`).value;
}

function CurrentValueAtTable(rowNumber){
  return returnInner(`v-${rowNumber}`);
}

function getData() {
    let RowList = rowNames();
    let data = empty();

    RowList.forEach(element => 
    {
    let rowNumber =  RowList.indexOf(element);   
    let selectedRowValue = InputValueAtEditForm(rowNumber)

    if (controlIsEmpty(selectedRowValue)) 
    data += CurrentValueAtTable(rowNumber);
     
    else  
    data += selectedRowValue ;
     
    // Split Değeri Değişkenin içinde olmamalı ("__")
    data += "__";
    });
    return data;
}

function tableDataID(column,row)
{
  return `${column}[${row}]`
}

function saveData(index) {
    let RowList = rowNames();
    let data = getData();
    let dataList = data.split("__"); // Split Değeri
    let columnNumber = index;

    RowList.forEach(element => 
    {
      let rowNumber = RowList.indexOf(element);
      let row = RowList[rowNumber];
      let value = dataList[rowNumber];
      let ID = tableDataID(columnNumber,row)
      
      AssignInner(ID,value);
    });

    $('#exampleModalCenter').modal('hide');
    isDocumentEdited = true;
}

function deleteButtons() {
    let file = sheet_data.length;
  
    for (let length = 0; length < file-1; length++) {
        try 
        {
          get("BTNX").remove();
          
        } 
        catch (error)
        {
          console.log("AboutButton : "+error)
          
        }
    }
}

function typeOfSearchingColumn_HTML(Aciklama)
{
  let HTML_Selection = empty();
  let RowList = rowNames();
  HTML_Selection += `<br>
  <label for="Column">${Aciklama}</label>
  <br>
  <select name="column" id="searchColumn">
  <optgroup label="Birini seçiniz...">`;
  
  for (let element of RowList) {
    HTML_Selection += `<option value="${element}">${element}</option>`;
  }
  HTML_Selection += `</optgroup></select><br>`;
  return HTML_Selection;

}

function setTypeofSearchingColumn() {
  let Aciklama = "Öğrenci Hangi Değer ile Arama Yapsın :";
  AssignInner("selectColumnDiv",typeOfSearchingColumn_HTML(Aciklama));
  get("uploadButton").style.visibility = "visible";
  get("uploadButton").disabled = false;
}

function createTable(file) {
    let HTML_Table = empty();
    HTML_Table = '<table id="excel-table" class="table table-striped table-bordered">';
    file.forEach(element =>{
      let row = file.indexOf(element);
      HTML_Table += makeRows(file, row);
    });
    HTML_Table += "</table>";
    return HTML_Table;
}

function makeRows(file, row) {
    let table_output = empty();
    table_output += '<tr id="' + row + '">';

    for (let cell = 0; cell < file[row].length; cell++) {
      table_output += makeCells(file, row, cell);
    }
    // buton Ekleme
    table_output += makeButtons(file,row);

    table_output += "</tr>";

    return table_output;
}

function makeCells(file, row, cell) {
    let row_name = file[0][cell];
    let cell_value = file[row][cell];

    if (row == 0) 
      return `<th>${cell_value}</th>`;
    
    else
      return `<td id="${CellID(row,row_name)}">${cell_value}</td>`;
    
}

function buttonHTMLValue(row)
{
  return `<td id="BTNX"><button onclick="editFormMenu(${row})" id="button${row}" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter"> Edit </button></td>`;
}

function makeButtons(file, row) {
    let buttonHTML = empty();
    if (row !== 0) 
      buttonHTML += buttonHTMLValue(row);
    
    else 
      return;
    
    return buttonHTML;
}

function IncomingTableData(data)
{
  data = new Uint8Array(data);
  var work_book = XLSX.read(data, { type: "array" });
  var sheet_name = work_book.SheetNames;
  sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]], {
    header: 1,
  });
  return sheet_data;
}

let AssignValues= (data) =>
{
  AssignInner("excel_data",empty());
  AssignInner("excel_data",data);
  AssignInner("cardHeader","Dosya Seçildi.");
  AssignInner("excel_name",excel_file.value.slice(12));

}

function ReadInputFile(reader) 
{
  let table_HTML = createTable(IncomingTableData(reader.result));
  AssignValues(table_HTML);
}

function DisplayAll()
{
  let tr = document.getElementsByTagName("tr");
     
  for(let element of tr)
  {
    element.style.display = "";
  }
}

function DisplayFiltered(search)
{
  let td = document.getElementsByTagName("td"); 
  let filter, tr, i, txtValue;
  filter = search.toUpperCase();
  tr = document.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) 
  {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (isContains(txtValue,filter)) 
      {
        tr[i].style.display = "";
      } 
      else 
      {
        tr[i].style.display = "none";
      }
    }       
  }
}

function isContains(a,b)
{
  return a.toUpperCase().indexOf(b) > -1;
}

function Search() 
{
 
    let search = get("InputID").value;
    
    
    if(search == empty())
    {
      DisplayAll();
    }
    else 
    {
      DisplayFiltered(search);
      
    }
  
  
}

function showBeforeSendDataAreYouSure() 
{
    myModal.show();
}

//table to excel
function sendExcelData() {
    let t2e = new Table2Excel();
    deleteButtons();
    let doc = document.querySelectorAll("#excel-table");
    myModal.hide();

    //TABLEtoExcelFile_2('xlsx');  Düzgün Çalışmıyor.

    // Gönderilecek 3 item olabilir
    //  1- JSON
    //  2- Excel Dosyasının kendisi
    //  3- Arama Yaptırtılacak Column Adı
    // ------------------------------------
    // 1
    JSON_Converter();
    // 2
    t2e.export(doc);
    // 3
    document.getElementById("searchColumn").value;
  // ------------------------------------
}

function JSON_Converter() {
    let file = sheet_data;
    // table id = "excel-table"
    // cell id ="${row}[${file[0][cell]}]"
    // row id ="${row}"
    let count = 0;
    let JSON_Data = "[";
    let index_data = empty();
    for (let i = 1; i < file.length; i++) {
      index_data += `{`;

      for (let j = 1; j < rowNames().length; j++) {
        let row = file[0][j].toString().toLowerCase().replace(" ", "_");
        let cell = file[i][j].toString().toLowerCase().replace(" ", "");

        index_data += `"${file[0][j]}":"${file[i][j]}"`;
        if (j != rowNames().length - 1) {
          index_data += ",";
        }
      }
      index_data += `}`;

      JSON_Data += index_data.replace("''", "");
    }

    JSON_Data += "]";

    console.log(JSON_Data);
    return JSON_Data;
}

let excel_file = get("excel_file");

//get("uploadButton").addEventListener("click", showBeforeSendDataAreYouSure);
EventListener("uploadButton","click",showBeforeSendDataAreYouSure);
get("ImSureButton").addEventListener("click", sendExcelData);

excel_file.addEventListener("change", (event) =>
{
  checkTheFileIsXLS(excel_file, event);
  var reader = new FileReader();
  reader.readAsArrayBuffer(event.target.files[0]);
  reader.onload = function (event) 
  {
    ReadInputFile(reader);
    setTypeofSearchingColumn();
    excel_file.value = empty();
  };
  ready = true;
});


