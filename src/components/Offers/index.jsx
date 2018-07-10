import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
 CardSubtitle, CardBody } from 'reactstrap';
import './offer.css';


const Offers = ({ offers = [], ffId, redeem }) =>
  ( offers.length > 0 && <div className="offers">
    { 'Rewards' }
    <br />
    <CardDeck>
    {
      offers.map(offer => (
        <Card key={offer.offerId} className="offer text-center">
          <CardBody>
            <CardTitle>{offer.title}</CardTitle>
            <CardText>{offer.description}</CardText>
            <Button size='lg' block color="primary" onClick={ () => redeem(ffId, offer.offerId) }>{ offer.actionText || 'Redeem' }</Button>
          </CardBody>
        </Card>
      ))
    }
    <Card className="not-offer">
      <CardBody>
        <CardTitle></CardTitle>
        <CardText><a href="" onClick={() => redeem(ffId)}>Customer choose not to redeem</a></CardText>
      </CardBody>
    </Card>
  </CardDeck></div> )

const mapStateToProps = ({ selectedCustomer }) => ({
  ffId: selectedCustomer.ffId,
  offers: selectedCustomer.offers
})

const mapDispatchToProps = {
  redeem: (ffId, offerId) => ({
    type: 'REDEEM',
    ffId, offerId
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(Offers);
