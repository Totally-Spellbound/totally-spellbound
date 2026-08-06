---
name: Remove completed worktrees
description: Delete a worktree as soon as its branch has been merged or its task is otherwise complete.
type: feedback
---

Do not leave completed worktrees behind. Once a worktree's changes are merged, deployed or explicitly abandoned, remove the worktree and verify the result with `git worktree list`.

Preserve any unmerged or user-owned changes. If a completed worktree is dirty, inspect it and ask before deleting rather than forcing removal.
