import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({

  models: { 
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions : [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          amount: 6000,
          category: 'Dev',
          createdAt: new Date('2021-02-12 08:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          amount: 3200,
          category: 'Casa',
          createdAt: new Date('2022-05-12 15:00:00'),
        }
      ],
    })
  },

  routes(){
    this.namespace = 'api'

    this.get('/transactions/', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions/', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
