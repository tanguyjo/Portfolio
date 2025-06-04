import React from 'react';

const Imageview: React.FC = () => {
  return (
    <div id='home'
      style={{
        width: '100vw',
        height: '90vh',
        overflowX: 'auto', // allow horizontal scroll if needed
      }}
    >
      <div
        style={{
          width: '100%', // can stretch beyond 100vw if needed
          height: '100%',
          backgroundImage: `url("background.png")`,
          backgroundSize: '100% auto', // Stretch width, maintain height
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minWidth: 'calc(90vh * 16 / 9)', // ensures 16:9 aspect min width
        }}
      />
    </div>
  );
};

export default Imageview;
