import React from "react";
import xMark from "../assets/icons/x_button.svg";
import "./HistoryBox.css";

function HistoryBox({ item, onDelete, onCheckboxChange }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const shortenString = (str, maxLength, suffix) => {
    if (str.length <= maxLength) return str;

    let truncatedStr = str.substr(0, maxLength);
    if (truncatedStr.charAt(maxLength - 1) !== " ") {
      truncatedStr =
        truncatedStr.substr(
          0,
          Math.min(truncatedStr.length, truncatedStr.lastIndexOf(" "))
        ) + suffix;
    } else {
      truncatedStr += suffix;
    }
    return truncatedStr;
  };

  const shortenList = (ingredients, maxLength) => {
    let result = "";
    let i = 0;
    while (i < ingredients.length) {
      const capitalizedIngredient =
        ingredients[i].charAt(0).toUpperCase() + ingredients[i].slice(1);
      if (result.length + capitalizedIngredient.length > maxLength) {
        break;
      } else {
        result += capitalizedIngredient + ", ";
        i++;
      }
    }
    if (i < ingredients.length) {
      result = result.substring(0, result.lastIndexOf(" "));
      result += " & More.";
    }
    return result;
  };

  return (
    <div key={item.id} className="recipe-container">
      <input type="checkbox" value={item.title} onChange={onCheckboxChange} />
      <img className="recipe-image" src={item.imageURL} alt={item.title} />
      <div className="recipe-details">
        <p> {shortenString(item.title, 17, "...")} </p>
        <div className="recipe-ingredients">
          <span>{shortenList(item.ingredients, 26)}</span>
          <span>{formatDate(item.updatedAt)}</span>
        </div>
      </div>
      <img className="delete" src={xMark} alt="delete" onClick={onDelete} />
    </div>
  );
}

export default HistoryBox;