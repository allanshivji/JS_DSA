// Class representing each node in the Trie
class TrieNode {
  constructor() {
    this.children = new Map(); // Map of character to TrieNode
    this.isEndOfWord = false; // Marks end of a valid word
  }
}

// Class representing the Trie itself
class Trie {
  constructor() {
    this.root = new TrieNode(); // Root node does not hold any character
  }

  // Inserts a word into the Trie
  insert(word) {
    let node = this.root; // Start from root
    for (let char of word) {
      // If char not found in children, create a new TrieNode
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char); // Move to the next node
    }
    node.isEndOfWord = true; // Mark the end of the word
  }

  // Checks if a word is present in the Trie
  contains(word) {
    let node = this.root;
    for (let char of word) {
      // If the character doesn't exist, word is not present
      if (!node.children.has(char)) {
        return false;
      }
      node = node.children.get(char);
    }
    return node.isEndOfWord; // Return true only if word ends here
  }

  // Removes a word from the Trie
  remove(word) {
    const removeHelper = (node, word, index) => {
      // Base case: end of word
      if (index === word.length) {
        if (!node.isEndOfWord) return false; // Word doesn't exist
        node.isEndOfWord = false; // Unmark the word
        return node.children.size === 0; // If leaf, node can be deleted
      }

      const char = word[index];
      const nextNode = node.children.get(char);

      if (!nextNode) return false; // Character not found

      const shouldDelete = removeHelper(nextNode, word, index + 1);

      if (shouldDelete) {
        node.children.delete(char); // Remove reference
        return node.children.size === 0 && !node.isEndOfWord;
      }

      return false;
    };

    removeHelper(this.root, word, 0);
  }

  // Returns true if any word starts with the given prefix
  startsWith(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children.has(char)) return false; // Prefix not found
      node = node.children.get(char);
    }
    return true; // All prefix characters matched
  }

  // Returns all words in the Trie that start with a given prefix
  getAllPrefix(prefix) {
    let node = this.root;
    for (let char of prefix) {
      if (!node.children.has(char)) return []; // No match found
      node = node.children.get(char);
    }

    // Helper function to collect words starting from this node
    const collectWords = (node, path, result) => {
      if (node.isEndOfWord) {
        result.push(path); // Add complete word to result
      }

      for (let [char, childNode] of node.children) {
        collectWords(childNode, path + char, result); // Recurse deeper
      }
    };

    const results = [];
    collectWords(node, prefix, results); // Start collecting from prefix node
    return results;
  }
}


const trie = new Trie();

trie.insert("apple");
trie.insert("app");
trie.insert("bat");
trie.insert("ball");

console.log(trie.contains("apple"));     // true
console.log(trie.contains("apples"));    // false
console.log(trie.startsWith("app"));     // true
console.log(trie.getAllPrefix("ba"));    // ['bat', 'ball']

trie.remove("bat");
console.log(trie.contains("bat"));       // false
console.log(trie.getAllPrefix("ba"));    // ['ball']