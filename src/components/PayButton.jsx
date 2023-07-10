import React, { useEffect, useRef } from 'react';

const PayButtonaa = (props) => {
  const scriptRef = useRef(null);

  const handlePayment = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.setAttribute('data-render', 'button');
    script.setAttribute('data-public-key', 'pub_test_GZlevgVBlUIA4Aq8jcYjNPJBJEnbitYV');
    script.setAttribute('data-currency', 'COP');
    script.setAttribute('data-amount-in-cents', `${props.total * 100}`);
    script.setAttribute('data-reference', '4XMPGKWWPKWQ');
    script.setAttribute('data-signature:integrity', '37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5');

    const form = document.querySelector('form');
    form.appendChild(script);
    scriptRef.current = script; // Guardar la referencia del script en el ref
  };

  useEffect(() => {
    handlePayment();

    return () => {
      // Verificar si el script existe antes de eliminarlo
      console.log(scriptRef.current, "SSSS")
      if (scriptRef.current) {
        const form = document.querySelector('form');
        form.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <form>
      {/* Puedes agregar otros elementos dentro del formulario si es necesario */}
    </form>
  );
};

export default PayButtonaa;