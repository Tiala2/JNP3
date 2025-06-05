import React, { useState, useEffect } from "react";
import GameGrid from "./components/GameGrid";
import Login from "./components/Login";
import styles from "./styles/survival.module.css";
import { FaHeart, FaSkull, FaGhost, FaUserNinja, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight, FaCrosshairs } from "react-icons/fa";

const directions = {
  u: { x: 0, y: -1 },
  d: { x: 0, y: 1 },
  l: { x: -1, y: 0 },
  r: { x: 1, y: 0 },
};

const GRID_SIZE = 10;

const initialState = () => ({
  player: { x: 0, y: 0 },
  objects: {},
  visited: {},
  health: 3,
  steps: 0,
  difficulty: 0.1,
  gameState: "playing",
});

function getRandomObject(difficulty, canSpawnMed) {
  const rand = Math.random();
  if (rand < difficulty) return "enemy";
  if (canSpawnMed && rand < difficulty + 0.05) return "med";
  return null;
}

export default function App() {
  const [screen, setScreen] = useState("login"); // "login", "menu", "game"
  const [user, setUser] = useState("");
  const [state, setState] = useState(initialState());

  // Conta monstros e curas no tabuleiro
  function countObjects(objects) {
    let monsterCount = 0;
    let medCount = 0;
    for (const v of Object.values(objects)) {
      if (v === "enemy") monsterCount++;
      if (v === "med") medCount++;
    }
    return { monsterCount, medCount };
  }

  function movePlayer(dir) {
    if (state.gameState !== "playing") return;
    const { x, y } = state.player;
    const dx = directions[dir].x;
    const dy = directions[dir].y;
    const newX = x + dx;
    const newY = y + dy;

    if (newX < 0 || newX >= GRID_SIZE || newY < 0 || newY >= GRID_SIZE) return;

    const newPos = { x: newX, y: newY };
    const key = `${newPos.x},${newPos.y}`;
    let newHealth = state.health;
    let newObjects = { ...state.objects };

    // Colisão com inimigo ou cura
    if (newObjects[key] === "enemy") {
      newHealth -= 1;
      delete newObjects[key];
    }
    if (newObjects[key] === "med") {
      newHealth = Math.min(3, newHealth + 1);
      delete newObjects[key];
    }

    // Conta monstros e curas antes de gerar novos
    const { monsterCount, medCount } = countObjects(newObjects);

    // Gera inimigos/cura apenas ao redor imediato
    const updatedObjects = { ...newObjects };
    let monstersAround = 0;
    for (let dy2 = -1; dy2 <= 1; dy2++) {
      for (let dx2 = -1; dx2 <= 1; dx2++) {
        if (dx2 === 0 && dy2 === 0) continue;
        const posX = newX + dx2;
        const posY = newY + dy2;
        const posKey = `${posX},${posY}`;
        if (
          posX >= 0 && posX < GRID_SIZE &&
          posY >= 0 && posY < GRID_SIZE
        ) {
          if (updatedObjects[posKey] === "enemy") monstersAround++;
        }
      }
    }
    // Só gera novo monstro se tiver menos de 2 ao redor
    for (let dy2 = -1; dy2 <= 1; dy2++) {
      for (let dx2 = -1; dx2 <= 1; dx2++) {
        if (dx2 === 0 && dy2 === 0) continue;
        const posX = newX + dx2;
        const posY = newY + dy2;
        const posKey = `${posX},${posY}`;
        if (
          posX >= 0 && posX < GRID_SIZE &&
          posY >= 0 && posY < GRID_SIZE &&
          !updatedObjects[posKey] &&
          monstersAround < 2 // Limite de monstros
        ) {
          // Só pode gerar cura se houver menos que metade do número de monstros
          const canSpawnMed = medCount < Math.floor((monsterCount + 1) / 2);
          const obj = getRandomObject(state.difficulty, canSpawnMed);
          if (obj === "enemy") {
            updatedObjects[posKey] = "enemy";
            monstersAround++;
          } else if (obj === "med" && canSpawnMed) {
            updatedObjects[posKey] = "med";
          }
        }
      }
    }

    // Atualiza visited
    const updatedVisited = { ...state.visited, [key]: true };

    // Dificuldade progressiva
    const newSteps = state.steps + 1;
    const newDifficulty = Math.min(0.5, 0.1 + newSteps * 0.01);

    setState({
      ...state,
      player: newPos,
      objects: updatedObjects,
      visited: updatedVisited,
      health: newHealth,
      steps: newSteps,
      difficulty: newDifficulty,
      gameState: newHealth <= 0 ? "lose" : "playing",
    });
  }

  function attack() {
    if (state.gameState !== "playing") return;
    const { x, y } = state.player;
    const updatedObjects = { ...state.objects };
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const key = `${x + dx},${y + dy}`;
        if (updatedObjects[key] === "enemy") {
          delete updatedObjects[key];
        }
      }
    }
    setState({ ...state, objects: updatedObjects });
  }

  function restart() {
    setState(initialState());
  }

  // Timer para ataque de monstro
  useEffect(() => {
    if (state.gameState !== "playing") return;

    let monsterTimeouts = [];
    const { x, y } = state.player;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const key = `${x + dx},${y + dy}`;
        if (state.objects[key] === "enemy") {
          // Cria um timeout para cada monstro ao redor
          const timeout = setTimeout(() => {
            setState(prev => {
              if (
                prev.objects[key] === "enemy" &&
                prev.gameState === "playing"
              ) {
                const newObjects = { ...prev.objects };
                delete newObjects[key];
                return {
                  ...prev,
                  health: prev.health - 1,
                  objects: newObjects,
                  gameState: prev.health - 1 <= 0 ? "lose" : "playing",
                };
              }
              return prev;
            });
          }, 3000);
          monsterTimeouts.push(timeout);
        }
      }
    }
    return () => {
      monsterTimeouts.forEach(clearTimeout);
    };
  }, [state.player, state.objects, state.gameState]);

  // Timer para reposição de cura
  useEffect(() => {
    if (state.gameState !== "playing") return;

    let medTimeouts = [];
    Object.entries(state.objects).forEach(([key, value]) => {
      if (value === "med") {
        const timeout = setTimeout(() => {
          setState(prev => {
            // Remove a cura antiga
            if (prev.objects[key] === "med") {
              const newObjects = { ...prev.objects };
              delete newObjects[key];

              // Procura um novo local vazio para a cura
              let newMedKey = null;
              for (let tries = 0; tries < 30; tries++) {
                const x = Math.floor(Math.random() * GRID_SIZE);
                const y = Math.floor(Math.random() * GRID_SIZE);
                const testKey = `${x},${y}`;
                if (
                  !newObjects[testKey] &&
                  !(prev.player.x === x && prev.player.y === y)
                ) {
                  newMedKey = testKey;
                  break;
                }
              }
              if (newMedKey) newObjects[newMedKey] = "med";

              return { ...prev, objects: newObjects };
            }
            return prev;
          });
        }, 5000);
        medTimeouts.push(timeout);
      }
    });
    return () => {
      medTimeouts.forEach(clearTimeout);
    };
  }, [state.objects, state.gameState, state.player]);

  // Para mostrar o número de monstros já visitados
  const monstersVisited = Object.values(state.visited).filter(v => v === "enemy").length;

  // Funções para navegação
  function handleLogin(username) {
    setUser(username);
    setScreen("menu");
    setState(initialState());
  }
  function handleStart() {
    setScreen("game");
    setState(initialState());
  }
  function handleExit() {
    setUser("");
    setScreen("login");
    setState(initialState());
  }
  function handleRestartMenu() {
    setScreen("menu");
    setState(initialState());
  }

  // Troca de telas
  if (screen === "login") {
    return <Login onLogin={handleLogin} />;
  }

  if (screen === "menu") {
    return (
      <div className={styles.menu_container}>
        <h1>Bem-vindo(a), {user}!</h1>
        <button className={styles.shoot} onClick={handleStart}>Iniciar Jogo</button>
        <button className={styles.restart} onClick={handleExit}>Sair</button>
      </div>
    );
  }

  // Tela do jogo
  return (
    <div className={styles.main_container}>
      <div className={styles.horizontal_container}>
        <div className={styles.grid_area}>
          <GameGrid player={state.player} objects={state.objects} visited={state.visited} />
        </div>
        <div className={styles.side_panel}>
          <h1>Tente sobreviver</h1>
          <div className={styles.lives_display}>
            <div>
              {[...Array(state.health)].map((_, i) => (
                <FaHeart key={i} color="#e53935" size={32} style={{ margin: "0 4px" }} />
              ))}
            </div>
          </div>
          <div className={styles.monster_counter}>
            <div>
              <FaSkull color="#fff" size={28} /> Monstros: {monstersVisited}
            </div>
          </div>
          <div className={styles.controls}>
            <div className={styles.dpad}>
              <div></div>
              <button onClick={() => movePlayer("u")}><FaArrowUp size={24} /></button>
              <div></div>
              <button onClick={() => movePlayer("l")}><FaArrowLeft size={24} /></button>
              <div></div>
              <button onClick={() => movePlayer("r")}><FaArrowRight size={24} /></button>
              <div></div>
              <button onClick={() => movePlayer("d")}><FaArrowDown size={24} /></button>
              <div></div>
            </div>
            <button className={styles.shoot}>
              <FaCrosshairs size={20} style={{ marginRight: 8 }} />
              ATIRAR
            </button>
          </div>
          {state.gameState === "lose" && <h2 style={{ color: "red" }}>Você perdeu!</h2>}
          <button onClick={restart} className={styles.restart}>Reiniciar</button>
          <button onClick={handleRestartMenu} className={styles.restart}>Sair para Menu</button>
        </div>
      </div>
    </div>
  );
}