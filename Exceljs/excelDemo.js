const exceljs = require('exceljs');
const {test, expect} = require('@playwright/test')

async function readExcel(worksheet, searchtext)
{
    let output = {rowvalue:null, colvalue:null};
    worksheet.eachRow((row, rowNumber) =>
    {
        row.eachCell((cell, colNumber)=>
        {
            if(cell.value===searchtext)
            {
                output.rowvalue = rowNumber;
                output.colvalue = colNumber;
                console.log(rowNumber, colNumber);
            }
        })
    })
    return output;
}

async function writeexcel(searchtext, replacetext, filepath)
{ 
    const workbook = new exceljs.Workbook()
    await workbook.xlsx.readFile(filepath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchtext);
    const cell = worksheet.getCell(output.rowvalue,output.colvalue+2);
    cell.value = replacetext;
    await workbook.xlsx.writeFile(filepath);
}   


test('upload download files', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    await page.locator('#downloadButton').click();
    await writeexcel('Mango', 350, "C:/Users/prati/Downloads/download.xlsx");
    await page.locator('fileinput').setInputFiles('C:/Users/prati/Downloads/download.xlsx')

})