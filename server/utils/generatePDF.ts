import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import type { Customer } from '../types/Customer';
import type { Order } from '../types/Order';
import type { Vehicle } from '../types/Vehicle';
import { OrderItem } from '../types/OrderItem';

const fontRegular = fs.readFileSync(
    path.join(__dirname, '..', 'assets', 'fonts', 'DejaVuSans.ttf')
);
const fontBold = fs.readFileSync(
    path.join(__dirname, '..', 'assets', 'fonts', 'DejaVuSans-Bold.ttf')
);
const logoPath = fs.readFileSync(
    path.join(__dirname, '..', 'assets', 'opravAuto.png')
);

export const getPDFInvoice = (order: any, res: Response) => {
    // ----- HTTP headers -----
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
        'Content-Disposition',
        `attachment; filename=invoice-${order._id}.pdf`
    );

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // Stream directly to response
    doc.pipe(res);

    generateHeader(doc);
    generateCustomerInformation(doc, order);
    generateOrderTable(doc, order);
    generateFooter(doc);

    doc.end();
};


const generateHeader = (doc: PDFKit.PDFDocument) => {

    try {
        doc.image(logoPath, 50, 45, { width: 50 });
    } catch {
        // Logo not found, skip image
    }

    doc
        .font(fontBold)
        .fillColor('#444444')
        .fontSize(20)
        .text('OpravAuto', 110, 57)
        .font(fontRegular)
        .fontSize(10)
        .text('OpravAuto.com', 200, 50, { align: 'right' })
        .text('U Servisu 123', 200, 65, { align: 'right' })
        .text('160 00 Praha', 200, 80, { align: 'right' })
        .moveDown();
};

const generateCustomerInformation = (doc: PDFKit.PDFDocument, order: Order) => {

    doc
        .font(fontBold)
        .fillColor('#444444')
        .fontSize(20)
        .text('Faktura', 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;

    // Left – invoice info
    doc
        .font(fontRegular)
        .fontSize(10)
        .text('Číslo faktury:', 50, customerInformationTop)
        .font(fontBold)
        .text(String(order._id), 150, customerInformationTop)
        .font(fontRegular)
        .text('Datum vystavení:', 50, customerInformationTop + 15)
        .text(
            formatDate(order.createdAt),
            150,
            customerInformationTop + 15
        )
        .text('Splatnost:', 50, customerInformationTop + 30)
        .text(
            formatDate(new Date()),
            150,
            customerInformationTop + 30
        )
        .text('K úhradě:', 50, customerInformationTop + 45)
        .text(
            formatCurrency(order.totalCost ?? 0),
            150,
            customerInformationTop + 45
        );

    // Right – customer info
    const customer: Customer = order.customer
    const customerName = `${customer.firstName} ${customer.lastName}`
    doc
        .font(fontBold)
        .text(customerName, 330, customerInformationTop)
        .text(customer.address ?? '', 330, customerInformationTop + 15)
        .text(customer.phoneNumber ?? '', 330, customerInformationTop + 30)
        .text(customer.email ?? '', 330, customerInformationTop + 45)
        .moveDown();

    generateHr(doc, 265);

    // Optional – vehicle info
    const vehicleTop = 300;
    const vehicle: Vehicle = order.vehicle;
    doc
        .font(fontBold)
        .text('Vozidlo', 50, vehicleTop)
        .font(fontRegular)
        .text(
            `${vehicle.make ?? ''} ${vehicle.model ?? ''}`.trim(),
            50,
            vehicleTop + 15
        )
        .text(
            vehicle.vin ? `VIN: ${vehicle.vin}` : '',
            50,
            vehicleTop + 30
        )
};

const generateOrderTable = (doc: PDFKit.PDFDocument, order: Order) => {

    let i;
    const invoiceTableTop = 380;

    doc.font(fontBold);
    generateTableRow(
        doc,
        invoiceTableTop,
        'Položka',
        'Cena / ks',
        'Množství',
        'Cena celkem'
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font(fontRegular);

    const items: OrderItem[] = order.items;

    for (i = 0; i < items.length; i++) {
        const item = items[i];
        const position = invoiceTableTop + (i + 1) * 30;

        generateTableRow(
            doc,
            position,
            item.label,
            formatCurrency(item.unitPrice),
            String(item.quantity ?? 1),
            formatCurrency(item.totalPrice)
        );

        generateHr(doc, position + 20);
    }

    const duePosition = invoiceTableTop + (i + 1) * 30 + 20;
    doc.font(fontBold);
    generateTableRow(
        doc,
        duePosition,
        '',
        'Celkem k úhradě',
        '',
        formatCurrency(order.totalCost)
    );
    doc.font(fontRegular);
};

const generateFooter = (doc: PDFKit.PDFDocument) => {

    doc
        .font(fontRegular)
        .fontSize(10)
        .text(
            'Platba je splatná do 15 dnů.',
            50,
            765,
            { align: 'center', width: 500 }
        )
        .text(
            'Děkujeme za využití našich služeb.',
            50,
            780,
            { align: 'center', width: 500 }
        );
};

const generateTableRow = (
    doc: PDFKit.PDFDocument,
    y: number,
    item: string,
    unitCost: string,
    quantity: string,
    lineTotal: string
) => {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(unitCost, 270, y, { width: 90, align: 'right' })
        .text(quantity, 370, y, { width: 90, align: 'center' })
        .text(lineTotal, 0, y, { align: 'right' });
};

const generateHr = (doc: PDFKit.PDFDocument, y: number) => {
    doc
        .strokeColor('#aaaaaa')
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
};

const formatCurrency = (amount: number) => {
    const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${formatted} Kč`;
};

const formatDate = (date: Date | string) => {
    const d = date instanceof Date ? date : new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
};
