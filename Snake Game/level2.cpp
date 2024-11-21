#include <iostream>
#include <cstdlib>   // rand and srand
#include <conio.h>   // _getch and _kbhit
#include <windows.h> // For Sleep
#include <ctime>     // for time

using namespace std;

class Snake {
private:
  bool gameOver;
  int width, height, x, y, fruitX, fruitY, score, level, speed;
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
  bool isGameOver() {
    return gameOver;
  }
  int getSpeed() {
    return speed;
  }
  ~Snake() {}
};

void Snake::setup() {
  srand(time(0)); // seed for random number generation
  dir = STOP;
  width = 60;
  height = 20;
  speed = 100;
  x = width / 2;
  y = height / 2;
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

      if (i == y && j == x) {
        cout << "0"; // Snake Head
      }
      else if (i == fruitY && j == fruitX) {
      // Snake Food
        cout << "*";
      }
      else {
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
  switch (dir) {
  case LEFT: x--; break;
  case RIGHT: x++; break;
  case UP: y--; break;
  case DOWN: y++; break;
  default: break;
  }

  // Food regenration and increasing snake speed
  if (x == fruitX && y == fruitY) {
    fruitX = rand() % width;
    fruitY = rand() % height;
    score += 10;

    if (score == 30) {
      level++;
    }
    if (level > 1 && speed > 20) {
      speed -= 5;
    }
  }

  // Boundary Collision
  if (x >= width || x < 0 || y >= height || y < 0) {
    gameOver = true;
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