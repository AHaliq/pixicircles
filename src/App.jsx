import styles from './App.module.css';
import Art from './Art.jsx';

const trsmooth = ({
  x, y, t0, d = 0.6,
}) => d + (1 - d) * Math.sin(
  (0.5 * x + (y / (1 + Math.sin(t0) / 2)) * 1 - 2 * t0) / 1,
);

function App() {
  return (
    <div class={styles.App}>
      <Art r={50} t={2} tr={trsmooth}/>
    </div>
  );
}

export default App;
