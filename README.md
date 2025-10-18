应用说明

这是一个用于在 Vercel 上运行的简单 FastAPI 应用。功能：

- 上传数据（每行一个）
- 上传账号并生成密钥
- 使用密钥查询账号

部署说明：

1. 在项目根目录中包含 `api/main.py`，Vercel 会把 `api/` 文件夹当作无服务器函数目录。
2. 确保 `requirements.txt` 包含 `fastapi` 和 `uvicorn`。
3. 本地测试使用 `uvicorn api.main:app --reload --port 8000`。

注意：当前实现使用临时文件存储（`.data` 目录）。Vercel 无服务器环境中文件系统是短暂的，仅适合演示或测试，生产请使用数据库或外部存储。


