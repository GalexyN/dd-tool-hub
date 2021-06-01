// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import Home from './pages/Home';
// import { DebookHelper } from './pages/DebookHelper';
// import { RevenueSTTemplateHelper } from './pages/RevenueSTTemplateHelper';

// export const App = () => {
//   return (
//     <Switch>
//       <div>
//         <Switch>
//           <Route exact path="/" component={Home} />
//           {/* <Route path="/list" component={List} /> */}
//           <Route exact path="/debookHelper" component={DebookHelper}></Route>
//           <Route
//             exact
//             path="/revenueSTTemplateHelper"
//             component={RevenueSTTemplateHelper}
//           ></Route>
//         </Switch>
//       </div>
//     </Switch>
//   );
// };

import React from 'react';

// BROWSER ROUTER //
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// PAGES //
import { Home } from './pages/Home';
import { DebookHelper } from './pages/DebookHelper';
import { RevenueSTTemplateHelper } from './pages/RevenueSTTemplateHelper';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path="/debookHelper" component={DebookHelper}></Route>
        <Route exact path="/revenueSTTemplateHelper" component={RevenueSTTemplateHelper}></Route>
      </Switch>
    </Router>
  );
};
