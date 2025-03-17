// Utility to generate permutations of an array
const generatePermutations = (arr) => {
    if (arr.length === 0) return [[]];
    const first = arr[0];
    const rest = arr.slice(1);
    const permsWithoutFirst = generatePermutations(rest);
    const allPerms = [];
    permsWithoutFirst.forEach((perm) => {
      for (let i = 0; i <= perm.length; i++) {
        allPerms.push([...perm.slice(0, i), first, ...perm.slice(i)]);
      }
    });
    return allPerms;
  };
  
  // Graph comparison check (Isomorphism check)
  const compareGraphs = (graph1, graph2) => {
    const nodes1 = Object.keys(graph1);
    const nodes2 = Object.keys(graph2);
  
    if (nodes1.length !== nodes2.length) return false;
  
    const permutations = generatePermutations(nodes2);
  
    // Check if any permutation of nodes in graph2 matches graph1
    for (let perm of permutations) {
      let isMatch = true;
  
      // Compare each node and its neighbors based on the permutation
      for (let i = 0; i < nodes1.length; i++) {
        const node1 = nodes1[i];
        const permutedNode2 = perm[i];
  
        // Check if the adjacency lists are equivalent
        const neighbors1 = graph1[node1].sort();
        const neighbors2 = graph2[permutedNode2].sort();
        if (JSON.stringify(neighbors1) !== JSON.stringify(neighbors2)) {
          isMatch = false;
          break;
        }
      }
  
      if (isMatch) return true;
    }
  
    return false;
  };
  
  const GraphComparison = ({ graph1, graph2, onResult }) => {
    const checkGraphComparison = () => {
      const result = compareGraphs(graph1, graph2);
      onResult(result);
    };
  
    return (
      <div>
        <button onClick={checkGraphComparison}>Compare Graphs</button>
      </div>
    );
  };
  
  export default GraphComparison;
  