#include <iostream>
#include <fstream> // for input output
#include <string> 
#include <sstream> // for stringstream
#include <vector>
#include <algorithm> // for transform
#include <cstdio> // for fopen
#include <io.h> // for _access
#include <direct.h> // for _mkdir
#include <conio.h> // for _getch
#include <stack>

using namespace std;
const int MAX_LINES = 25;
const int MAX_CHAR_PER_LINE = 90;

struct SearchResults {
  int lineNum;
  int pos;
};

class LineEditor {
  vector<string> buffer;
  stack<vector<string>> undoStack;
  stack<vector<string>> redoStack;

public:
  bool isChanges = false;
  LineEditor() {
    instructions();
  }

  int getBufferSize() const {
    return buffer.size();
  }

  void instructions(); // basic instruction 
  
  string arguments(); // function for get the path of the file

  FILE* fileOpen(const string& fullPath, const string& mode); // open a file
  void readFileIntoBuffer(FILE* file); // store file data in buffer
  void writeFileFromBuffer(FILE *file); // write data in file

  void displayBuffer() const; // dispaly buffer data

  void insertLine(int position, const string& line); // insert a line at specific postion
  void updateLine(int position, const string& line); // update a specific line
  void deleteLine(int position); // delete a specific line

  SearchResults searchWord(const string& word) const; // search a word and store in composite variable

  // undo and redo
  void undo();
  void redo();
};

void LineEditor::instructions() {
  system("cls");
  cout << "======================= Instructions =======================" << endl;
  cout << "1) \"Editor\" - Open a default file or create \"file.txt\" if it doesn't exist." << endl;
  cout << "2) \"Editor fileName.txt\" - Open or create the specified file in the current directory." << endl;
  cout << "3) \"Editor fileName.txt directoryName\" - Open or create the specified file in the directory." << endl;
  cout << "Press any key to continue..." << endl;
  _getch();
}

string LineEditor::arguments() {
  cout << "Enter a command: ";
  string command;
  getline(cin, command);

  stringstream ss(command);
  string fileName, directoryName;
  int count = 0;
  string word;

  while (ss >> word) {
    if (count == 0) {
      transform(word.begin(), word.end(), word.begin(), ::tolower);
      if (word != "editor") {
        cout << "Invalid command. Please start with \"Editor\"." << endl;
        return "";
      }
    } else if (count == 1) {
      fileName = word;
      if (fileName.find(".txt") == string::npos) {
        cout << "Invalid file name. Please include the .txt extension." << endl;
        return "";
      }
    } else if (count == 2) {
      directoryName = word;
    } else {
      cout << "Too many arguments." << endl;
      return "";
    }
    count++;
  }

  string fullPath = fileName.length() ? (directoryName.length() ? directoryName + "\\" + fileName : fileName) : "file.txt";
  return fullPath;
}

FILE* LineEditor::fileOpen(const string& fullPath, const string& mode = "r+") {
  size_t found = fullPath.find_last_of('\\');
  string directoryName, fileName;

  if (found != string::npos) {
    directoryName = fullPath.substr(0, found);
    fileName = fullPath.substr(found + 1);
  } else {
    fileName = fullPath;
  }

  if (!directoryName.empty() && _access(directoryName.c_str(), 0) == -1) {
    _mkdir(directoryName.c_str());
  }

  FILE* file = fopen(fullPath.c_str(), mode.c_str());
  if (!file) {
    file = fopen(fullPath.c_str(), "w+");
  }
  
  if (!file) {
    cout << "Error opening file" << endl;
    return NULL;
  } 
  readFileIntoBuffer(file);
  return file;
}

void LineEditor::readFileIntoBuffer(FILE* file) {
  buffer.clear();
  rewind(file);
  char line[MAX_CHAR_PER_LINE];

  while (fgets(line, sizeof(line), file) && buffer.size() < MAX_LINES) {
    buffer.emplace_back(line);
  }
  fclose(file);
}

void LineEditor::writeFileFromBuffer(FILE *file) {
  for (const auto& line : buffer) {
    fprintf(file, "%s", line.c_str());
  }
  fclose(file);
}

void LineEditor::displayBuffer() const {
  int lineNumber = 1;
  for (const auto& line : buffer) {
    cout << "[Line No." << lineNumber++ << ":] " << line;
  }
  cout << endl;
}

void LineEditor::insertLine(int position, const string& line) {
  isChanges = true;
  if (position >= 0 && position <= buffer.size() && buffer.size() < MAX_LINES) {
    undoStack.push(buffer);
    buffer.insert(buffer.begin() + position, line);
  }
}

void LineEditor::updateLine(int position, const string& line) {
  isChanges = true;
  if (position >= 0 && position <= buffer.size() && buffer.size() < MAX_LINES) {
    undoStack.push(buffer);
    buffer[position] = line;
  }
}

void LineEditor::deleteLine(int position) {
  if (position >= 0 && position < buffer.size()) {
    undoStack.push(buffer);
    buffer.erase(buffer.begin() + position);
  }
}

void LineEditor::undo() {
  if(!undoStack.empty()) {
    redoStack.push(buffer);
    buffer = undoStack.top();
    undoStack.pop();
  }
}

void LineEditor::redo() {
  if (!redoStack.empty()) {
    undoStack.push(buffer);
    buffer = redoStack.top();
    redoStack.pop();
  }
}

SearchResults LineEditor::searchWord(const string& word) const {
  SearchResults result;
  result.lineNum = -1;
  result.pos = -1;
  for (int i = 0; i < buffer.size(); ++i) {
    result.pos = buffer[i].find(word);
    if (result.pos != string::npos) {
      result.lineNum = i;
      return result;
    }
  }
  return result;
}

int main() {
  LineEditor editor;
  string fullPath = editor.arguments();

  if (fullPath.empty()) {
    return 0;
  }

  FILE* file = editor.fileOpen(fullPath);
  if (!file) {
    cout << "File could not be opened or created." << endl;
    return 1;
  }
  int option;
  while (true) {
    if (fullPath.empty()) {
      break;
    }
    cout << "Choose an option:\n";
    cout << "1. Display buffer\n";
    cout << "2. Insert line\n";
    cout << "3. Update line\n";
    cout << "4. Delete line\n";
    cout << "5. Search word\n";
    cout << "6. Undo\n";
    cout << "7. Redo\n";
    cout << "8. Save\n";
    cout << "Any else text to Exit\n";
    cin >> option;
    cin.ignore();
    if(option == 1) {
      editor.displayBuffer();
    }
    else if (option == 2) {
      cout << "Total number of line in buffer: " << editor.getBufferSize() << endl;
      if(editor.getBufferSize() >= MAX_LINES) {
        cout << "Buffer is full. Cannot insert more lines." << endl;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        continue;
      }
      cout << "Insert a line in between 1 and " << editor.getBufferSize() + 1 << endl;
      int pos;
      string line;
      cout << "Enter line position: ";
      cin >> pos;
      if(pos < 1 || pos > editor.getBufferSize() + 1) {
        cout << "Invalid line position." << endl;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        continue;
      }
      cin.ignore();
      cout << "Enter line text: ";
      getline(cin, line);
      if(line.empty()) continue;
      if(line.size() > MAX_CHAR_PER_LINE) {
        cout << "Line is too long. please insert upto 90 characters" << endl;
        continue;
      }
      editor.insertLine(pos - 1, line + "\n");
    }
    else if (option == 3) {
      cout << "Total number of line in buffer: " << editor.getBufferSize() << endl;
      cout << "Update a line in between 1 and " << editor.getBufferSize() << endl;
      int pos;
      string line;
      cout << "Enter line position: ";
      cin >> pos;
      if(pos < 1 || pos > editor.getBufferSize()) {
        cout << "Invalid line position." << endl;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        continue;
      }
      cin.ignore();
      cout << "Enter line text: ";
      getline(cin, line);
      if(line.empty()) {
        cout << "======= Cannot update empty line. ======" << endl;
        cin.clear();
      };
      if(line.size() > MAX_CHAR_PER_LINE) {
        cout << "Line is too long. please insert upto 90 characters" << endl;
        continue;
      }
      editor.updateLine(pos - 1, line + "\n");
    }

    else if (option == 4) {
      cout << "Total number of line in buffer: " << editor.getBufferSize() << endl;
      cout << "Delete a line in between 1 and " << editor.getBufferSize() << endl;
      if(editor.getBufferSize() == 0) {
        cout << "Buffer is empty. Cannot delete more lines." << endl;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        continue;
      }
      int pos;
      cout << "Enter line position: ";
      cin >> pos;
      if(pos < 1 || pos > editor.getBufferSize()) {
        cout << "Invalid line position." << endl;
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        continue;
      }
      cin.ignore();
      editor.deleteLine(pos - 1);
    }
    else if(option == 5) {
      string word;
      cout << "Enter word to search: ";
      cin >> word;
      SearchResults cursor = editor.searchWord(word);
      if (cursor.pos != -1) {
        cout << "Found at line " << cursor.lineNum + 1 << ", position " << cursor.pos << endl;
      } else {
        cout << "Word not found.\n";
      }
    }
    else if (option == 6) {
      editor.undo();
    } 
    else if (option == 7) {
      editor.redo();
    }
    else if(option == 8) {  
      if(!editor.isChanges) continue;
      FILE* file = fopen(fullPath.c_str(), "w+");
      editor.writeFileFromBuffer(file);
    }
    else {  
      break;
    }
  }
  return 0;
}