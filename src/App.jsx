// import React from 'react';
// import './index.css';
// import RandomAyat from './RandomAyat';

// export const App = () => {
//   return (
//     <div>
//       <RandomAyat />
//     </div>
//   );
// };

import React from 'react';
import Calculator from './Calculator';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <div className='app-content'>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
