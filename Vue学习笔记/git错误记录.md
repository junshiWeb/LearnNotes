报错提示

fatal: Not a git repository (or any of the parent directories): .git

重大错误：不是git存储库(或任何父目录):.git

原因：没有进行初始化git init

解决：初始化git  init



报错提示

error: src refspec master does not match any error: failed to push some refs to 'https://github.com/w614026827/supermalltest.git'

错误:src没有匹配到任何

错误:未能将一些参考文件推送到“https://github.com/w614026827/supermalltest.git”

常见原因：

1.本地git仓库目录下为空

2.本地仓库add后未commit

3. git init错误

解决：

1.控制面板打开文件夹选项  打开隐藏文件和文件夹显示

2.到本地仓库目录下查看是否有.git文件夹——无 则git init

3.看.git文件夹下是否有之前提交的文件——若无 则重新 git commit (如果之前git add过的话 没有就要重新 add commit)

fatal: remote origin already exists.

只要两步：

1、先删除

```
$ git remote rm origin
```

2、再次执行添加就可以了。　