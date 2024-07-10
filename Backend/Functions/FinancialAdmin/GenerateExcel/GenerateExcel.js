const connection = require('../../../Services/connection');
const ExcelJS = require('exceljs');

module.exports = async function generateExcel(req, res) {
    try {
        const sql = `
            SELECT payment.payment_id, payment.payment_date, payment.seeker_charge, job.job_id
            FROM parttime_srilanka.payment 
            INNER JOIN parttime_srilanka.job ON payment.job_id = job.job_id
        `;

        connection.query(sql, async (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json("Internal Server Error");
            } else {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Job Seeker Payments');

                // Add columns
                worksheet.columns = [
                    { header: 'Payment ID', key: 'payment_id', width: 15 },
                    { header: 'Payment Date', key: 'payment_date', width: 20 },
                    { header: 'Seeker Charge', key: 'seeker_charge', width: 15 },
                    { header: 'Job ID', key: 'job_id', width: 15 },
                ];

                // Add rows
                result.forEach(payment => {
                    worksheet.addRow(payment);
                });

                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', 'attachment; filename=job_seeker_payments.xlsx');

                await workbook.xlsx.write(res);
                res.end();
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
};
