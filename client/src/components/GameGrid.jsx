import React from "react";
import styles from "../styles/survival.module.css";
import { FaUserNinja, FaGhost, FaHeart } from "react-icons/fa";
import { GiPistolGun } from "react-icons/gi"; // ou outro ícone de munição

const GRID_SIZE = 10;

export default function GameGrid({ player, objects, lanterna, lastDir }) {
  const rows = [];

  for (let y = 0; y < GRID_SIZE; y++) {
    const cells = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const key = `${x},${y}`;
      let content = null;

      // Sempre mostra o player
      if (player.x === x && player.y === y) {
        console.log("Desenhando player em:", x, y);
        content = (
          <td key={key} className={styles.player}>
            <FaUserNinja color="#fff" size={36} />
          </td>
        );
      } else if (lanterna) {
        // Clareia apenas os quadrados imediatamente ao redor do player
        const dx = Math.abs(x - player.x);
        const dy = Math.abs(y - player.y);

        if (
          (dx === 1 && dy === 0) ||
          (dx === 0 && dy === 1) ||
          (dx === 1 && dy === 1)
        ) {
          // Quadrados ao redor (inclusive diagonais)
          if (objects[key] === "enemy") {
            content = (
              <td key={key} className={styles.visao}>
                <FaGhost color="#fff" size={36} />
              </td>
            );
          } else if (objects[key] === "med") {
            content = (
              <td key={key} className={styles.visao}>
                <FaHeart color="#e53935" size={36} />
              </td>
            );
          } else if (objects[key] === "ammo") {
            content = (
              <td key={key} className={styles.visao}>
                <GiPistolGun color="#ffd600" size={36} />
              </td>
            );
          } else {
            content = <td key={key} className={styles.visao}></td>;
          }
        } else {
          // Fora do raio: escuro
          content = <td key={key} className={styles.dark}></td>;
        }
      } else {
        // Lanterna desligada: só player aparece, resto escuro
        content = <td key={key} className={styles.dark}></td>;
      }
      cells.push(content);
    }
    rows.push(<tr key={y}>{cells}</tr>);
  }

  return (
    <table className={styles.table}>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Função para mover o jogador
function movePlayer(state, direction) {
  const move = { x: 0, y: 0 };

  switch (direction) {
    case "ArrowUp":
      move.y = -1;
      break;
    case "ArrowDown":
      move.y = 1;
      break;
    case "ArrowLeft":
      move.x = -1;
      break;
    case "ArrowRight":
      move.x = 1;
      break;
    default:
      return state;
  }

  const newX = state.player.x + move.x;
  const newY = state.player.y + move.y;
  console.log("Tentando mover para:", newX, newY);

  // Verifica limites da grade
  if (newX < 0 || newY < 0 || newX >= GRID_SIZE || newY >= GRID_SIZE) {
    return state; // Movimento inválido, retorna estado atual
  }

  // Verifica colisão com inimigos
  const enemyKey = `${newX},${newY}`;
  if (state.objects[enemyKey] === "enemy") {
    console.log("Colidiu com inimigo!");
    return state; // Colidiu com inimigo, não move
  }

  // Verifica coleta de itens
  const medKey = `${newX},${newY}`;
  if (state.objects[medKey] === "med") {
    console.log("Coletou medkit!");
    // Lógica para coletar medkit
  }

  const ammoKey = `${newX},${newY}`;
  if (state.objects[ammoKey] === "ammo") {
    console.log("Coletou munição!");
    // Lógica para coletar munição
  }

  // Move o jogador
  const newPlayer = { x: newX, y: newY };
  return { ...state, player: newPlayer };
}