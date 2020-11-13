export const findPath = (a, tree) => {
  for (var key in tree) {
    // for each key in the object tree
    //if (tree.hasOwnProperty(key)) {
    // if it's an owned key
    if (a === tree[key]) return key; 
    // if the item beign searched is at this key then return this key as the path
    else if (
      tree[key] &&
      typeof tree[key] === "object" &&
      key !== "parsedCss" &&
      key !== "classes" &&
      key !== "css" &&
      key !== "props"
    ) {            
      // otherwise if the item at this key is also an object
      var path = findPath(a, tree[key]); // search for the item a in that object
      if (path) {
          if (Array.isArray(tree)) {
            return "[" + key + "]." + path; // if found then the path is this key followed by the result of the search
          } else{
            return key + "." + path; // if found then the path is this key followed by the result of the search
          }
        
      }
    }
    // }
  }
};

export const findParent = (a, tree) => {
  for (var key in tree) {
    // for each key in the object tree
    //if (tree.hasOwnProperty(key)) {
    // if it's an owned key
    if (a === tree[key]) return key; 
    // if the item beign searched is at this key then return this key as the path
    else if (
      tree[key] &&
      typeof tree[key] === "object" &&
      key !== "parsedCss" &&
      key !== "classes" &&
      key !== "css" &&
      key !== "props"
    ) {            
      // otherwise if the item at this key is also an object
      var path = findPath(a, tree[key]); // search for the item a in that object
      if (path) {
          if (Array.isArray(tree)) {
            return "[" + key + "]." + path; // if found then the path is this key followed by the result of the search
          } else{
            return key + "." + path; // if found then the path is this key followed by the result of the search
          }
        
      }
    }
    // }
  }
};
