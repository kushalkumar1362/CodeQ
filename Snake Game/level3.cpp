#include <iostream>
#include <cstdlib>   // rand and srand
#include <conio.h>   // _getch and _kbhit
#include <windows.h> // For Sleep
#include <ctime>     // for time
#include <vector>

using namespace std;

class Snake {
private:
  bool gameOver;
  int width, height, fruitX, fruitY, score, level, speed;
  vector<pair<int, int>> snake;
  enum Direction { STOP = 0, LEFT, RIGHT, UP, DOWN };
  Direction dir;

  void hideCursor() {
    HANDLE hStdOut = GetStdHandle(STD_OUTPUT_HANDLE);
    CONSOLE_CURSOR_INFO curInfo;
    GetConsoleCursorInfo(hStdOut, &curInfo);
    curInfo.bVisible = FALSE; // Hide cursor
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

void Snake::setup() {
  srand(time(0)); // seed for random number generation
  dir = STOP;
  width = 60;
  height = 20;
  speed = 100;
  snake.push_back({width / 2, height / 2});
  fruitX = rand() % width;
  fruitY = rand() % height;
  score = 0;
  gameOver = 0;
  hideCursor();
  level = 1;
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

      bool printBody = 0;
      for (int k = 0; k < snake.size(); k++) {
        if (snake[k].first == j && snake[k].second == i) {
          if (k == 0) {
            cout << "O"; // Snake head
          }
          else {
            cout << "o";
          }
          printBody = true;
          break;
        }
      }
      if (i == fruitY && j == fruitX) {
        cout << "*"; // Snake Food
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
      case 'a': if (dir != RIGHT) dir = LEFT; break;
      case 'd': if (dir != LEFT) dir = RIGHT; break;
      case 'w': if (dir != DOWN) dir = UP; break;
      case 's': if (dir != UP) dir = DOWN; break;
      case 'x': gameOver = true; break;
    }
  }
}

void Snake::run()
{
  // Snake movement
  for (int i = snake.size() - 1; i > 0; i--) {
    snake[i] = snake[i - 1];
  }

 // Move the head
  switch (dir) {
    case LEFT: snake[0].first--; break;
    case RIGHT: snake[0].first++; break;
    case UP: snake[0].second--; break;
    case DOWN: snake[0].second++; break;
    default: break;
  }

  // Food regenration and increasing snake speed and length of snake
  if (snake[0].first == fruitX && snake[0].second == fruitY)
  {
    score += 10;
    fruitX = rand() % width;
    fruitY = rand() % height;
    level = (score == 30 || score == 60) ? level + 1 : level; // Increase the level of game
    speed = (speed > 10 && level > 1) ? speed - 5 : speed;    // Increase the speed
    if (level == 3)
    {
      snake.push_back({snake[snake.size()].first, snake[snake.size()].second});
    }
  }

  // Boundary Collision
  if(snake[0].first >= width || snake[0].first < 0 || snake[0].second >= height || snake[0].second < 0) {
    gameOver = true;
  }

  // Self-collision
  for (int i = 1; i < snake.size(); i++) {
    if(snake[0].first == snake[i].first && snake[0].second == snake[i].second) {
      gameOver = true;
    }
  }
}

int main() {
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
  return 0;
}