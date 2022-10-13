import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemURL, setItemURL] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addNewItem = (e) => {
     e.preventDefault();
      axios.post('/api/shelf', { 
        name: itemName,
        url: itemURL
       }).then(() => {
        fetchItems();
     }).catch((e) => {
        console.log(e);
        alert('Something went wrong.');
     });
  }
  


  
  return (
    
    <div className="container">
      <h2>Add a to shelf</h2>
            <form onSubmit={addNewItem}>
                <input value={itemName} onChange={(e) => setItemName(e.target.value)} type="text" placeholder='Name'/>
                <input value={itemURL} onChange={(e) => setItemURL(e.target.value)} type="text" placeholder='URL'/>
                <input type="submit" />
            </form>
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
    }

export default ShelfPage;
