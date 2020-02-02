const XlsxPopulate = require('xlsx-populate');
const fs = require('fs');
module.exports = {
    buatXlsx: (xlsxTemplatePath, outputPath, workbookEditor, cb) => {
        XlsxPopulate.fromFileAsync( xlsxTemplatePath )
            .then(workbook => {
                workbookEditor(workbook)
                if (fs.existsSync(outputPath)) {
                    fs.unlinkSync(outputPath);
                }
                workbook.toFileAsync(outputPath);
                setTimeout(() => fs.unlinkSync(outputPath), 3600000)
            }).then(() => {
                cb&&cb()
            })
    }
}