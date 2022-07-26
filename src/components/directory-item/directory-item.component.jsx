import "./directory-item.styles.scss";
import { useNavigate } from 'react-router-dom';
import React from "react";
import { Link } from "react-router-dom";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title,route } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);
  return (
    <div className="directory-item-container" onClick={onNavigateHandler}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body">
        <Link to={`/${category.title}`}>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Link>
      </div>
    </div>
  );
};

export default DirectoryItem;
