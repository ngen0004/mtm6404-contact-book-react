import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import db from '../db';
import { collection, getDocs } from 'firebase/firestore';

function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const contactsCollection = collection(db, 'contacts');
      const contactSnapshot = await getDocs(contactsCollection);
      const contactList = contactSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      contactList.sort((a, b) => a.lastName.localeCompare(b.lastName));

      setContacts(contactList);
    };
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
        <div className="add-button">
            <h1>Contacts</h1>     
            <Link to="/new"><button className='adds'>+</button></Link>
        </div>
        <div>
            <input className='search-bar' type="text" placeholder="Search Contacts" value={search}
            onChange={(e) => setSearch(e.target.value)} />
        
            <ul className="list-group">
            {filteredContacts.map(contact => (
            <li key={contact.id} className="list-group-item">
                <Link to={`/contact/${contact.id}`}>
                {contact.firstName} {contact.lastName}
                </Link>
            </li>
            ))}
            </ul>  
        </div>    
    </div>
  );
}

export default Home;
