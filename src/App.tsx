import styles from './index.module.scss';
import Canvas from './core/Canvas/Canvas';
import { Grid } from './grid/Grid';
import { ReactElement } from 'react';

function App(): ReactElement {
  return (
     <div className={styles.game}>
        <Canvas />
        <Grid />
      </div> 
  )
}

export default App
