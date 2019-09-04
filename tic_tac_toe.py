# basic tic-tac-toe game
from random import randint

def create_board(): # may not be the most visually appealing as None denotes no 'X' or 'O' and assumes 3x3 board for simplicity
    board =[[None for _ in range(3)] for _ in range(3)]
    return board

def display_board(board):
    for row_num in range(len(board)):
        # throughout program i use len(board) even though i assume a 3x3 board for future improvements to encompass other dimensions possibly or it looks better than hardcoded values generally
        print(board[row_num])
    print()

def make_move(x_or_o, row_num, col_num, board):
    board[row_num][col_num] = x_or_o

def is_row_complete_driver(board):
    for row_num in range(len(board)):
        if is_row_complete(row_num, board):
            return True
    return False

def is_row_complete(row_num, board):
    first_entry_mark = board[row_num][0] # may not be efficient
    if not first_entry_mark: # aka if first entry of row is initial value still
        return False
    # compare other 2 entries to first entry of row
    for entry_num in range(1, len(board)):
        if first_entry_mark != board[row_num][entry_num]:
            return False # eg ['X','O', 'X] upon seeing 'O', you know row is not complete
    return True

def is_column_complete_driver(board):
    for col_num in range(len(board)):
        if is_column_complete(col_num, board):
            return True
    return False

def is_column_complete(col_num, board): # similar logic to row_complete
    first_entry_mark = board[0][col_num]
    if not first_entry_mark:
        return False
    for entry_num in range(1, len(board)):
        if first_entry_mark != board[entry_num][col_num]:
            return False
    return True

def is_left_diagonal_complete(board):
    # check for left diagonal completion
    # left diagonal entry indices are [0][0], [1][1], [2][2]

    first_entry_mark = board[0][0]
    if not first_entry_mark: # entry is None aka initial entry value still
        return False
    for num in range(1, len(board)): 
        if first_entry_mark != board[num][num]:
            return False
    return True

def is_right_diagonal_complete(board): # similar logic to left_diagonal_complete which might be bad under DRY principle
    # check for right diagonal completion
    # right diagonal entry indices are [0][2], [1][1], [2][0]
    
    first_entry_mark = board[0][2]
    if not first_entry_mark:
        return False
    # probably inefficient as hardcoded among other reasons
    col_num = 1
    for row_num in range(1,len(board)):
        if first_entry_mark != board[row_num][col_num]:
            return False
        col_num -= 1
    return True

def is_valid_move(row_num, col_num, board):
    return board[row_num][col_num] is None

def ask_for_user_input(): 
    valid_location_indices = ['0','1','2'] # contrary to human intuition 0 is first row or column
    row_move = input("Enter valid row locations (0, 1, 2): ")
    while row_move not in valid_location_indices:
        row_move = input("Enter valid row locations (0, 1, 2): ")
    
    col_move = input("Enter valid column locations (0, 1, 2): ")
    print()
    while col_move not in valid_location_indices:
        col_move = input("Enter valid column locations (0, 1, 2): ")
        print()
    
    row_move, col_move = int(row_move), int(col_move)
    return row_move, col_move

# driver
accepted_marks = ['X', 'O'] # waste of space but program is small
# winner_found = False
winner = None
board = create_board()
turn = 1 # for display purposes to denote round number

display_board(board)
player_mark = input("Player, pick 'X' or 'O': ")
print()

while player_mark not in accepted_marks:
    player_mark = input("Invalid mark.  Try again.  Pick 'X' or 'O': ")
    print()

if player_mark == 'O':
    computer_mark = 'X'
else:
    computer_mark = 'O'
while True: # main game loop
    print("TURN: " + str(turn))
    display_board(board)
    # arbitarily player makes first move
    row_move, col_move = ask_for_user_input()
    while not is_valid_move(row_move, col_move, board):
        row_move, col_move = ask_for_user_input()
    make_move(player_mark, row_move, col_move, board)
    
    display_board(board)

    if is_row_complete_driver(board) or is_column_complete_driver(board) or is_left_diagonal_complete(board) or is_right_diagonal_complete(board):
        # winner_found = True
        winner = 'Player'
        break

    # computer makes move
    row_move, col_move = randint(0, 2), randint(0, 2)
    while not is_valid_move(row_move, col_move, board):
        row_move, col_move = randint(0, 2), randint(0, 2)
    make_move(computer_mark, row_move, col_move, board)

    display_board(board)
    
    if is_row_complete_driver(board) or is_column_complete_driver(board) or is_left_diagonal_complete(board) or is_right_diagonal_complete(board):
        # winner_found = True
        winner = 'Computer'
        break
    
    turn += 1

if winner == 'Computer':
    print('Aw man. You lost. Try again next time.')
else: # you the player won
    print("Congratulations. You won.")
    

    
