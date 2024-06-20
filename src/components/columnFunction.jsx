export const getButtonStyle = (item) => {
    if (item.stock > 0 && item.stock < 100) {
      return {
        backgroundColor: "#C8F9CD",
        borderColor: "#C8F9CD",
        borderRadius: "20px",
        color: "green",
        transition: "background-color 0.3s ease",
      };
    } else if (item.stock >= 100) {
      return {
        backgroundColor: "orange",
        borderColor: "orange",
        color: "black",
        borderRadius: "20px",
        transition: "background-color 0.3s ease",
      };
    } else {
      return {
        backgroundColor: "#FFD9CB",
        borderColor: "#FFD9CB",
        color: "red",
        borderRadius: "20px",
        transition: "background-color 0.3s ease",
      };
    }
  };

  export const truncateDescription = (description, maxLength = 26) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "..";
  };

  