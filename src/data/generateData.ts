// src/data/generateData.ts

import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

// Import TypeScript interfaces
import { Role } from '../types/Role';
import { Company } from '../types/Company';
import { User } from '../types/User';
import { Customer } from '../types/Customer';
import { Contact } from '../types/Contact';
import { Port } from '../types/Port';
import { Partner } from '../types/Partner';
import { Shipment } from '../types/Shipment';
import { Billing } from '../types/Billing';

// Define the number of entries for each entity
const NUM_ROLES = 4;
const NUM_COMPANIES = 2;
const NUM_USERS_PER_COMPANY = 5;
const NUM_CUSTOMERS_PER_COMPANY = 10;
const NUM_CONTACTS_PER_CUSTOMER = 3;
const NUM_PORTS = 5;
const NUM_PARTNERS_PER_COMPANY = 3;
const NUM_SHIPMENTS = 20;
const NUM_BILLINGS = 20;

// Generate Roles
const roles: Role[] = [
	{ id: 1, name: 'Admin', permissions: 'Full access to all features.' },
	{ id: 2, name: 'Manager', permissions: 'Manage shipments and customers.' },
	{ id: 3, name: 'Operator', permissions: 'Handle day-to-day shipment tasks.' },
	{ id: 4, name: 'Viewer', permissions: 'View-only access to data.' },
];

// Generate Companies
const companies: Company[] = Array.from({ length: NUM_COMPANIES }, (_, i) => ({
	id: i + 1,
	name: faker.company.name(),
	address: faker.location.streetAddress(),
	phone: faker.phone.number(),
	email: faker.internet.email(),
	createdAt: faker.date.past().toISOString(),
	updatedAt: faker.date.recent().toISOString(),
}));

// Generate Users
let userId = 1;
const users: User[] = [];
companies.forEach((company) => {
	for (let i = 0; i < NUM_USERS_PER_COMPANY; i++) {
		users.push({
			id: userId,
			username: faker.internet.userName(),
			email: faker.internet.email(),
			roleId: faker.number.int({ min: 1, max: NUM_ROLES }),
			companyId: company.id,
			createdAt: faker.date.past().toISOString(),
			updatedAt: faker.date.recent().toISOString(),
		});
		userId++;
	}
});

// Generate Customers
let customerId = 1;
const customers: Customer[] = [];
companies.forEach((company) => {
	for (let i = 0; i < NUM_CUSTOMERS_PER_COMPANY; i++) {
		customers.push({
			id: customerId,
			companyName: faker.company.name(),
			contactEmail: faker.internet.email(),
			contactPhone: faker.phone.number(),
			address: faker.location.streetAddress(),
			companyId: company.id,
		});
		customerId++;
	}
});

// Generate Contacts
let contactId = 1;
const contacts: Contact[] = [];
customers.forEach((customer) => {
	for (let i = 0; i < NUM_CONTACTS_PER_CUSTOMER; i++) {
		contacts.push({
			id: contactId,
			name: faker.name.fullName(),
			email: faker.internet.email(),
			phone: faker.phone.number(),
			role: faker.name.jobTitle(),
			customerId: customer.id,
			createdAt: faker.date.past().toISOString(),
			updatedAt: faker.date.recent().toISOString(),
		});
		contactId++;
	}
});

// Generate Ports
const ports: Port[] = Array.from({ length: NUM_PORTS }, (_, i) => ({
	id: i + 1,
	name: `${faker.location.city()} Port`,
	country: faker.location.country(),
	coordinates: {
		latitude: faker.location.latitude(),
		longitude: faker.location.longitude(),
	},
	createdAt: faker.date.past().toISOString(),
	updatedAt: faker.date.recent().toISOString(),
}));

// Generate Partners
let partnerId = 1;
const partners: Partner[] = [];
companies.forEach((company) => {
	for (let i = 0; i < NUM_PARTNERS_PER_COMPANY; i++) {
		partners.push({
			id: partnerId,
			name: faker.company.name(),
			type: faker.helpers.arrayElement(['Carrier', 'Broker', 'Warehouse']),
			contactEmail: faker.internet.email(),
			contactPhone: faker.phone.number(),
			address: faker.location.streetAddress(),
			servicesProvided: faker.lorem.sentence(),
			companyId: company.id,
			createdAt: faker.date.past().toISOString(),
			updatedAt: faker.date.recent().toISOString(),
		});
		partnerId++;
	}
});

// Generate Shipments
let shipmentId = 1;
const shipments: Shipment[] = [];
for (let i = 0; i < NUM_SHIPMENTS; i++) {
	const departurePort = faker.helpers.arrayElement(ports);
	const arrivalPort = faker.helpers.arrayElement(
		ports.filter((port) => port.id !== departurePort.id)
	);
	const customer = faker.helpers.arrayElement(customers);
	const contact = faker.helpers.arrayElement(
		contacts.filter((c) => c.customerId === customer.id)
	);
	const itineraryPorts = faker.helpers
		.shuffle(ports)
		.slice(0, 3)
		.map((port) => port.id);
	const billing = shipmentId; // Assuming one billing per shipment for simplicity

	shipments.push({
		id: shipmentId,
		shipmentNumber: `GL-${faker.number.int({ min: 1000, max: 9999 })}`,
		contents: faker.commerce.productDescription(),
		quantity: `${faker.number.int({ min: 100, max: 1000 })} units`,
		departureDate: faker.date.future().toISOString().split('T')[0],
		arrivalDate: faker.date.future().toISOString().split('T')[0],
		status: faker.helpers.arrayElement([
			'In Transit',
			'Delivered',
			'Delayed',
			'Pending',
		]),
		itinerary: itineraryPorts,
		departurePortId: departurePort.id,
		arrivalPortId: arrivalPort.id,
		mainContactId: contact.id,
		customerId: customer.id,
		billingId: billing,
		createdAt: faker.date.past().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	});
	shipmentId++;
}

// Generate Billing Records
let billingId = 1;
const billing: Billing[] = [];
for (let i = 0; i < NUM_BILLINGS; i++) {
	const isPartner = faker.datatype.boolean();
	const from = isPartner
		? faker.helpers.arrayElement(partners).id
		: faker.helpers.arrayElement(customers).id;
	const to = isPartner
		? faker.helpers.arrayElement(customers).id
		: faker.helpers.arrayElement(partners).id;

	billing.push({
		id: billingId,
		amount: parseFloat(
			faker.number
				.float({ min: 1000, max: 10000, fractionDigits: 2 })
				.toString()
		),
		date: faker.date.future().toISOString().split('T')[0],
		type: faker.helpers.arrayElement(['Invoice', 'Payment']),
		from: from,
		to: to,
		description: faker.lorem.sentence(),
		shipmentId: faker.helpers.arrayElement(shipments).id,
		createdAt: faker.date.past().toISOString(),
		updatedAt: faker.date.recent().toISOString(),
	});
	billingId++;
}

// Compile All Data
const db = {
	roles,
	companies,
	users,
	customers,
	contacts,
	ports,
	partners,
	shipments,
	billing,
};

// Define the path to the public folder
const publicDir = path.join(__dirname, '../../public');
const dbPath = path.join(publicDir, 'db.json');

// Write to db.json
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log('db.json has been generated successfully!');
