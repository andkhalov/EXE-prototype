#!/usr/bin/env python3
import sys

def main():
    try:
        with open("commit-map.txt", "r", encoding="utf-8") as f:
            lines = f.readlines()
    except FileNotFoundError:
        print("Файл commit-map.txt не найден!", file=sys.stderr)
        sys.exit(1)
    
    output = []
    output.append("case \"$GIT_COMMIT\" in")
    
    for line in lines:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        # Ожидаемый формат:
        # COMMIT:<hash>||AUTHOR:<имя>||EMAIL:<email>||DATE:<дата>||MESSAGE:<сообщение>
        parts = line.split("||")
        commit_hash = None
        author = None
        email = None
        date = None
        message = None
        
        for part in parts:
            if part.startswith("COMMIT:"):
                commit_hash = part[len("COMMIT:"):]
            elif part.startswith("AUTHOR:"):
                author = part[len("AUTHOR:"):]
            elif part.startswith("EMAIL:"):
                email = part[len("EMAIL:"):]
            elif part.startswith("DATE:"):
                date = part[len("DATE:"):]
            elif part.startswith("MESSAGE:"):
                message = part[len("MESSAGE:"):]
        
        if not (commit_hash and author and email and date):
            print(f"Ошибка: недостаточно данных в строке: {line}", file=sys.stderr)
            continue
        
        block = f'''    {commit_hash})
        export GIT_AUTHOR_NAME="{author}"
        export GIT_AUTHOR_EMAIL="{email}"
        export GIT_AUTHOR_DATE="{date}"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"'''
        if message:
            block += f'\n        # MESSAGE: {message}'
        block += "\n        ;;"
        output.append(block)
    
    output.append("    *)\n        ;;")
    output.append("esac")
    
    print("\n".join(output))

if __name__ == "__main__":
    main()
