import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import db from '../db';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchContact = async () => {
      const contactRef = doc(db, 'contacts', id);
      const contactSnap = await getDoc(contactRef);
      if (contactSnap.exists()) {
        const data = contactSnap.data();
        setContact(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      } else {
        console.log("No such document!");
      }
    };
    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'contacts', id), {
      firstName,
      lastName,
      email
    });
    navigate(`/contact/${id}`);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'contacts', id));
    navigate('/');
  };

  return contact ? (
    <div className="container">
        <Link to="/" className="back-link">Contacts</Link>
      <h1>Edit Contact</h1>
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
        <button type="submit" className='btn'>Update Contact</button>        
        <Link to={`/contact/${id}`}>
            <button type="button" className="delete">Cancel</button>
        </Link>
      </form>
      <button className="delete" onClick={handleDelete}>Delete</button>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default EditContact;
