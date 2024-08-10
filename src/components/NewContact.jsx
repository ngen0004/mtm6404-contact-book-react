import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import db from '../db';
import { collection, addDoc } from 'firebase/firestore';

function NewContact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newContact = { firstName, lastName, email };
    const newReference = await addDoc(collection(db, 'contacts'), newContact);
    navigate(`/contact/${newReference.id}`);
  };

  return (
    <div className="container">
        <Link to="/" className="back-link">Back to Contacts</Link>
      <h1>New Contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <button type="submit" className="btn">Add Contact</button>
        <Link to="/">
            <button type="button" className="delete">Cancel</button>
        </Link>
      </form>
    </div>
  );
}

export default NewContact;
