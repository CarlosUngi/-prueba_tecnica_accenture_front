import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoStateService } from '../../data/services/todo-state.service';
import { Task } from '../../core/models/task.model';
import { Category } from '../../core/models/category.model';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
    standalone: false
})
export class TasksPage implements OnInit, OnDestroy {
    tasks: Task[] = [];
    categories: Category[] = [];

    private subscriptions: Subscription = new Subscription();

    selectedCategoryFilter: string = 'all';
    newTaskTitle: string = '';
    newTaskCategoryId: string = '';
    newCategoryName: string = '';
    newCategoryColor: string = 'primary';

    constructor(private todoStateService: TodoStateService) { }

    ngOnInit() {
        this.subscriptions.add(
            this.todoStateService.categories$.subscribe(cats => {
                this.categories = cats;
            })
        );

        this.subscriptions.add(
            this.todoStateService.tasks$.subscribe(tasks => {
                this.tasks = tasks;
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
    addTask() {
        if (!this.newTaskTitle.trim()) return;
        this.todoStateService.addTask(this.newTaskTitle, this.newTaskCategoryId);
        this.newTaskTitle = '';
        this.newTaskCategoryId = '';
    }

    toggleTaskStatus(task: Task) {
        this.todoStateService.toggleTaskStatus(task.id);
    }

    deleteTask(id: string) {
        this.todoStateService.deleteTask(id);
    }

    addCategory() {
        if (!this.newCategoryName.trim()) return;
        this.todoStateService.addCategory(this.newCategoryName, this.newCategoryColor);
        this.newCategoryName = '';
    }

    deleteCategory(id: string) {
        this.todoStateService.deleteCategory(id);
        if (this.selectedCategoryFilter === id) {
            this.selectedCategoryFilter = 'all';
        }
    }

    get filteredTasks(): Task[] {
        if (this.selectedCategoryFilter === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(t => t.categoryId === this.selectedCategoryFilter);
    }

    getCategoryColor(categoryId?: string): string {
        if (!categoryId) return 'light';
        const cat = this.categories.find(c => c.id === categoryId);
        return cat ? cat.color : 'light';
    }

    getCategoryName(categoryId?: string): string {
        if (!categoryId) return '';
        const cat = this.categories.find(c => c.id === categoryId);
        return cat ? cat.name : '';
    }
}