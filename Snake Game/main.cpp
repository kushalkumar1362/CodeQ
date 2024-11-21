#include <iostream>
#include <cstdlib>   // rand 
#include <conio.h>   // _getch and _kbhit
#include <windows.h> // For Sleep
#include <ctime>     // for time
#include <deque>

using namespace std;

class Snake {
private:
  bool gameOver;
  int width, height, fruitX, fruitY, score, level, speed;
  deque<pair<int, int>> snake;
  enum Direction { STOP, LEFT, RIGHT, UP, DOWN };
  Direction dir;
  char directionSymbol;
  void hideCursor() {
    HANDLE hStdOut = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO curInfo;
    GetConsoleCursorInfo(hStdOut, &curInfo);
    curInfo.bVisible = FALSE;
    SetConsoleCursorInfo(hStdOut, &curInfo);
  }

  void setCursorToXY(int x, int y) {
    COORD coord;
    coord.X = x;
    coord.Y = y;
    SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), coord);
  }

public:
  Snake() {
    setup();
  }

  void setup();
  void draw();
  void input();
  void run();
  bool isGameOver() { return gameOver; }
  int getSpeed() { return speed; }
  ~Snake() {}
};

int main() {
  char ch;
  do {
    Snake snake;
    system("cls");
    while (!snake.isGameOver()) {
      // system("cls");
      snake.draw();
      snake.input();
      snake.run();
      Sleep(snake.getSpeed());
    }
    cout << "Game Over!!!" << endl;
    cout << "Press 'r' to restart the game and any other key to exit." << endl;
    ch = tolower(_getch());
  } while (ch == 'r'); 
  return 0;
}

void Snake::setup() {
  srand(time(0));
  dir = STOP;
  width = 60;
  height = 20;
  speed = 100;
  snake.push_front({width / 2, height / 2});
  fruitX = rand() % width;
  fruitY = rand() % height;
  score = 0;
  gameOver = 0;
  hideCursor();
  level = 1;
  directionSymbol = 'O';
}

void Snake::draw() {
  setCursorToXY(0, 0);
  // Draw the top boundary
  for (int i = 0; i < width + 2; i++) {
    cout << "#";
  }
  cout << endl;

  // Draw the middle Boundary
  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      // Left boundary
      if (j == 0) {
        cout << "#";
      }

      bool printBody = false;
      for (const auto &body : snake) {
        if (body.first == j && body.second == i) {
          if(snake.front() == body) {
            cout << directionSymbol;
          }
          else {
            cout << "o";
          }
          printBody = true;
          break;
        }
      }
      
      // Snake Food
      if (i == fruitY && j == fruitX) {
        cout << "*"; 
      }
      else if (!printBody) {
        cout << " ";
      }
      // Right boundary
      if (j == width - 1) {
        cout << "#";
      }
    }
    cout << endl;
  }

  // Draw the Bottom boundary
  for (int i = 0; i < width + 2; i++) {
    cout << "#";
  }
  cout << endl;

  // Show score and Level
  cout << "Level : " << level << endl
      << "Score : " << score << "\tPress x to quit the game " << endl;
}

void Snake::input() {
  if (_kbhit()) {
    char key = tolower(_getch());
    switch (key) {
      case 'a': if (dir != RIGHT) dir = LEFT; directionSymbol = '<'; break;
      case 'd': if (dir != LEFT) dir = RIGHT;  directionSymbol = '>'; break;
      case 'w': if (dir != DOWN) dir = UP;  directionSymbol = '^'; break;
      case 's': if (dir != UP) dir = DOWN;  directionSymbol = 'v'; break;
      case 'x': gameOver = true; break;
    }
  }
}

void Snake::run()
{
 // Move the head
  pair<int, int> newHead = snake.front();
  switch (dir) {
    case LEFT: newHead.first--; break;
    case RIGHT: newHead.first++; break;
    case UP: newHead.second--; break;
    case DOWN: newHead.second++; break;
    default: break;
  }

  snake.push_front(newHead); // Add new head position

  // Food regenration and increasing snake speed and length of snake
  if (snake.front().first == fruitX && snake.front().second == fruitY)
  {
    score += 10;
    fruitX = rand() % width;
    fruitY = rand() % height;
    level = (score == 30 || score == 60) ? level + 1 : level; // Increase the level of game
    speed = (speed > 10 && level > 1) ? speed - 5 : speed;    // Increase the speed
    if (level == 3)
    {
      return;
    }
  }
  snake.pop_back();

  // Boundary Collision
  if(snake.front().first >= width || snake.front().first < 0 || snake.front().second >= height || snake.front().second < 0) {
    gameOver = true;
  }

  // Self-collision
  for (auto it = snake.begin() + 1; it != snake.end(); ++it) {
    if(snake.front() == *it) {
      gameOver = true;
    }
  }
}
