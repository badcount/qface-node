import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Badge} from 'reactstrap';
import './customer.css';

const CustomerList = ({ customers, selectedCustomer, selectCustomer }) => (
   customers.length > 0 && <ListGroup className="customer-list" flush>
     <h3>We found a match</h3>
    {

      customers.map(customer => {
        const className = customer.ffId === selectedCustomer.ffId ? 'justify-content-between text-left active' : 'justify-content-between text-left';
        return (
          <ListGroupItem key={customer.ffId} className={className} tag="a" active={customer.ffId === selectedCustomer.ffId} onClick={() => selectCustomer(customer)}>
            { customer.avatar && <img className="avatar" src={customer.avatar} /> }
            <span>
              { `${customer.confidence}%` }
            </span>
             <span>{customer.name}</span>
             {customer.name === 'Anonymous' && <span>{` - ${ Math.floor(Math.random() * 10) + 1 } visits last month` }</span> }
             { customer.name !== 'Anonymous' && customer.ffId === selectedCustomer.ffId && <span className={`text-right tier-${customer.tier.toLowerCase()}`}>{ customer.tier }</span> }
          </ListGroupItem> )
      })
    }
  </ListGroup>
)

const mapStateToProps = ({ customers, selectedCustomer }) => ({
  customers, selectedCustomer
});

const mapDispatchToProps = {
  selectCustomer: customer => ({
    type: 'SET_SELECTED_CUSTOMER',
    customer
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList);
