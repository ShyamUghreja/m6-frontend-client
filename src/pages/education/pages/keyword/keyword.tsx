import React from 'react'
import { Container } from 'react-bootstrap'
import './keyword.sass'
import Courseheaderbg from '../../../../assets/images/course-header-bg.svg';
import Light from '../../../../assets/images/light-bulb.svg';
import Usericon from '../../../../assets/images/user-icon.svg';


const Keyword = () => {
  return (
    <>
      <div>
        <section className='header-sec'>
          <div className="">
            <Container>
              <div className="topheadimg">
                <img src={Courseheaderbg} className='headerbg' alt="" />
                <img src={Usericon} className='user-icon' alt="" />
              </div>
              <div className='heading-text'>
                <h2 className='heading-2'>Keywords</h2>
              </div>
            </Container>
          </div>
        </section>
        <section className='Keyword-sec'>
          <div className="">
            <Container>
              <div className='main-bg-color'>
                <h3 className='heading-3'>Welcome, my friend 👋</h3>
                <div className='mt-4 p-3 p-lg-4 d-flex bg-white border-left-secondary'>
                  <img src={Light} className="img-fluid image-icon" alt="" />
                  <h3 className='fw-500 heading-3'>Here is a crypto glossary of some keywords we might come across. Familiarise yourself with these.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>📈 <strong> Average Order Size: </strong> The average amount of money exchanged in each order made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💰 <strong> Average Payment Amount: </strong> The average amount of money paid in each payment made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💵 <strong> Average Trade Size: </strong> The average amount of money traded in each transaction made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💳 <strong> Average Transaction Size: </strong> The average amount of money exchanged in each transaction made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💱 <strong> Average Trade Value: </strong> The average amount of money exchanged in each trade made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🤝 <strong> Average User Activity: </strong> The average number of transactions made by each user on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🔗 <strong> Blockchain: </strong> A chain of blocks containing records of transactions that are cryptographically secured and distributed across a network of computers.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🤝 <strong> Consensus: </strong> The agreement of a majority of the nodes in a distributed network that a particular transaction is valid and should be added to the blockchain.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💰 <strong> Cryptocurrency: </strong> A digital asset designed to be used as a medium of exchange that uses cryptography to secure its transactions and to control the creation of additional units.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🌐 <strong> Decentralized: </strong> A system where no single entity has authority over the network and transactions are verified by consensus.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🖥️ <strong> Distributed Ledger Technology: </strong> A digital database of transactions maintained by a network of computers, rather than a single centralized server.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🔐 <strong> Hash: </strong> A cryptographic hash function used for verifying data integrity and generating a unique signature for each block on a blockchain.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>⛏️ <strong> Mining: </strong> The process of verifying and adding transactions to a blockchain, and earning rewards in the form of cryptocurrency</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🔗 <strong> On-Chain: </strong> A term used to describe transactions or data stored on a blockchain.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>📝 <strong> Off-Chain: </strong> A term used to describe transactions or data stored off the blockchain, usually in a private database.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🚫 <strong> Order Cancellation Rate: </strong> The percentage of orders that were cancelled on the platform in a given period of time. This is tracked over time to monitor the performance of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>✅ <strong> Order Execution Rate: </strong> The percentage of orders that were executed successfully on the platform in a given period of time. This is tracked over time to monitor the performance of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>⏱️ <strong> Order Fulfillment Time: </strong> The average length of time for an order to be fulfilled on the platform in a given period of time. This is tracked over time to monitor the performance of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💰 <strong> Outstanding Loans: </strong> The total amount of money loaned out to borrowers on the platform. This is tracked over time to monitor the growth of the lending market and to see how much capital is available for borrowers.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🔒 <strong> Proof-of-Stake: </strong> A consensus algorithm that requires participants to stake their tokens in order to verify transactions and add them to the blockchain.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>🔒 <strong> Proof-of-Work: </strong> A consensus algorithm that requires computers to solve complex cryptographic puzzles in order to verify transactions and add them to the blockchain.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💻 <strong> Smart Contract: </strong> A self-executing computer protocol that allows for the transfer of digital assets between parties without the need for a third-party intermediary.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💰 <strong> Total Market Capitalization: </strong> The total value of the assets traded on the platform in a given period of time. This is tracked over time to monitor the overall value of the platform and to identify trends in investor behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>📊 <strong> Total Number of Orders: </strong> The total number of orders made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>📈 Total Number of Transactions: The total number of transactions made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user activity.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>👥 <strong> Total Number of Users: </strong> The total number of users that have registered on the platform in a given period of time. This is tracked over time to monitor the usage of the platform and to identify trends in user activity.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💳 <strong> Total Payments Made: </strong> The total number of payments made on the platform in a given period of time. This is tracked over time to monitor the activity of the platform and to identify trends in user activity.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💹 <strong> Total Trade Volume: </strong> The total amount of money traded on the platform in a given period of time. This is tracked over time to monitor the trading activity of the platform and to identify trends in investor behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💱 <strong> Total Volume of Trades: </strong> The total amount of money traded on the platform in a given period of time. This is tracked over time to monitor the trading activity of the platform and to identify trends in investor behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>💸 <strong> Transaction Fees: </strong> The average transaction fee charged by the platform in a given period of time. This is tracked over time to monitor the cost of using the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>✅ <strong> Transaction Success Rate: </strong> The percentage of transactions that were completed successfully on the platform in a given period of time. This is tracked over time to monitor the performance of the platform and to identify trends in user behaviour.</h3>
                </div>
                <div className='p-3 p-lg-4 mt-3 mt-lg-4 d-flex bg-white Keyword'>
                  <h3 className='fw-500 heading-3'>⏰ <strong> Transaction Time: </strong> The average length of time for a transaction to be completed on the platform in a given period of time. This is tracked over time to monitor the performance of the platform and to identify trends in user behaviour.</h3>
                </div>
              </div>
            </Container>
          </div>
        </section>
      </div>
    </>
  )
}

export default Keyword