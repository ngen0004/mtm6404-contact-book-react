import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import db from '../db';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const contactRef = doc(db, 'contacts', id);
      const contactSnap = await getDoc(contactRef);
      if (contactSnap.exists()) {
        setContact(contactSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchContact();
  }, [id]);

  return contact ? (
    <div className="container">
        <div className="add-button">
            <Link to="/" className="back-link">Contacts</Link>
            <Link to={`/edit/${id}`}><button className='cont'>Edit</button></Link>
        </div>        
        <div className="contact-details">
            <h1>{contact.firstName} {contact.lastName}</h1>
            <p>email: {contact.email}</p>
        </div>
        
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ContactDetails;
