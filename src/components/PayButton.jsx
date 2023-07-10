import React, { useEffect } from 'react';

const PayButton = (props) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.setAttribute('data-render', 'button');
    script.setAttribute('data-public-key', 'pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV');
    script.setAttribute('data-currency', 'COP');
    script.setAttribute('data-amount-in-cents', `${props.total * 100}`);
    script.setAttribute('data-reference', '4XMPGKWWPKWQ');
    script.setAttribute('data-signature:integrity', '37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5');
    document.querySelector('form').appendChild(script);

    return () => {
      document.querySelector('form').removeChild(script);
    };
  }, []);

  return (
    <form>
      {/* Puedes agregar otros elementos dentro del formulario si es necesario */}
    </form>
  );
};

export default PayButton;