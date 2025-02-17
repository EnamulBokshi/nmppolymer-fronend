import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contacts = () => {
    const [contacts, setContacts] = useState([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
        { id: 3, name: 'Sam Johnson', email: 'sam.johnson@example.com' },
        { id: 4, name: 'Emily Brown', email: 'emily.brown@example.com' },
        { id: 5, name: 'Michael Scott', email: 'michael.scott@example.com' },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const contactsPerPage = 3;

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    const deleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
        setShowConfirm(false);
    };

    const nextPage = () => {
        if (currentPage < Math.ceil(contacts.length / contactsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Contacts</h2>
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                {currentContacts.map((contact) => (
                    <motion.li
                        key={contact.id}
                        className="flex items-center justify-between mb-4 p-2 border-b border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: contact.id * 0.1 }}
                    >
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold">
                                {contact.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                                <p className="font-bold">{contact.name}</p>
                                <p className="text-gray-600 text-sm">{contact.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => { setSelectedContact(contact); setShowConfirm(true); }}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </motion.li>
                ))}
            </motion.ul>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-4">
                <button onClick={prevPage} className="px-3 py-1 bg-gray-300 rounded-md" disabled={currentPage === 1}>Prev</button>
                <span>Page {currentPage}</span>
                <button onClick={nextPage} className="px-3 py-1 bg-gray-300 rounded-md" disabled={currentPage === Math.ceil(contacts.length / contactsPerPage)}>Next</button>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showConfirm && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-lg text-center"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                            <p>Are you sure you want to delete {selectedContact?.name}?</p>
                            <div className="mt-4 flex justify-center gap-4">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => deleteContact(selectedContact.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Contacts;
