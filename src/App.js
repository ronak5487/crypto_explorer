import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RiBitCoinLine} from 'react-icons/ri';
import './App.css';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1'
      );
      setCryptos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowMoreClick = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1'
      );
      setCryptos(response.data);
      setShowMore(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCryptoClick = (crypto) => {
    setSelectedCrypto(crypto);
  };

  const handleCloseModal = () => {
    setSelectedCrypto(null);
  };

  return (
    <div className="container">
      <h1 className="title">Top Cryptocurrencies</h1>
      <div className="crypto-container">
        {cryptos.map((crypto) => (
          <div
            className={`crypto-card ${selectedCrypto === crypto && 'active'}`}
            key={crypto.id}
            onClick={() => handleCryptoClick(crypto)}
          >
            <div className="crypto-icon">
              <RiBitCoinLine />
            </div>
            <div className="crypto-details">
              <h2>{crypto.name}</h2>
              <p className="symbol">{crypto.symbol.toUpperCase()}</p>
              <p className="price">${crypto.current_price}</p>
              <div className="hover-animation">Click to know more details</div>
            </div>
          </div>
        ))}
      </div>
      {!showMore && (
        <button className="show-more-btn" onClick={handleShowMoreClick}>
          Show More !!
        </button>
      )}
      {selectedCrypto && (
        <div className="crypto-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedCrypto.name}</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                Symbol: <span className="modal-info">{selectedCrypto.symbol.toUpperCase()}</span>
              </p>
              <p>
                Current Price:{' '}
                <span className="modal-info">${selectedCrypto.current_price}</span>
              </p>
              <p>
                Market Cap:{' '}
                <span className="modal-info">${selectedCrypto.market_cap}</span>
              </p>
              <p>
                Total Volume:{' '}
                <span className="modal-info">${selectedCrypto.total_volume}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
