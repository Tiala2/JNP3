import React from "react";
import styles from "../styles/survival.module.css";
import { FaUserNinja, FaGhost, FaHeart } from "react-icons/fa";

const GRID_SIZE = 10;

export default function GameGrid({ player, objects, visited }) {
  const rows = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    const cells = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      const key = `${x},${y}`;
      let content = null;
      const dist = Math.max(Math.abs(player.x - x), Math.abs(player.y - y));
      const VISION = 2; // raio de visão

      if (player.x === x && player.y === y) {
        content = (
          <td key={key} className={styles.player}>
            <FaUserNinja color="#fff" size={28} />
          </td>
        );
      } else if (dist <= VISION) {
        if (objects[key] === "enemy") {
          content = (
            <td key={key} className={styles.enemy}>
              <FaGhost color="#fff" size={28} />
            </td>
          );
        } else if (objects[key] === "med") {
          content = (
            <td key={key} className={styles.med}>
              <FaHeart color="#e53935" size={28} />
            </td>
          );
        } else {
          content = <td key={key} className={styles.td}></td>;
        }
      } else {
        content = <td key={key} className={styles.fog}></td>;
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