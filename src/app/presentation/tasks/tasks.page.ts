import { Component, OnInit } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { Category } from '../../core/models/category.model';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.page.html',
    styleUrls: ['./tasks.page.scss'],
    standalone: false
})
export class TasksPage implements OnInit {
    tasks: Task[] = [];
    categories: Category[] = [];

    selectedCategoryFilter: string = 'all';

    newTaskTitle: string = '';
    newTaskCategoryId: string = '';

    newCategoryName: string = '';
    newCategoryColor: string = 'primary';
    constructor() { }

    ngOnInit() {
        this.categories = [
            { id: 'cat-1', name: 'Trabajo', color: 'medium', createdAt: new Date() },
            { id: 'cat-2', name: 'Personal', color: 'success', createdAt: new Date() },
            { id: 'cat-3', name: 'Urgente', color: 'danger', createdAt: new Date() }
        ];

        this.tasks = [
            { id: 'task-1', title: 'Revisar requerimientos de Accenture', isCompleted: true, categoryId: 'cat-1', createdAt: new Date() },
            { id: 'task-2', title: 'Implementar almacenamiento local con RxJS', isCompleted: false, categoryId: 'cat-1', createdAt: new Date() },
            { id: 'task-3', title: 'Comprar café especial', isCompleted: false, categoryId: 'cat-2', createdAt: new Date() }
        ];
    }

    addTask() {
        if (!this.newTaskTitle.trim()) return;

        const newTask: Task = {
            id: 'task-' + Date.now(),
            title: this.newTaskTitle.trim(),
            isCompleted: false,
            categoryId: this.newTaskCategoryId || undefined,
            createdAt: new Date()
        };

        this.tasks.push(newTask);
        this.newTaskTitle = '';
        this.newTaskCategoryId = '';
    }

    toggleTaskStatus(task: Task) {
        task.isCompleted = !task.isCompleted;
    }

    deleteTask(id: string) {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    addCategory() {
        if (!this.newCategoryName.trim()) return;

        const newCategory: Category = {
            id: 'cat-' + Date.now(),
            name: this.newCategoryName.trim(),
            color: this.newCategoryColor,
            createdAt: new Date()
        };

        this.categories.push(newCategory);
        this.newCategoryName = '';
    }

    deleteCategory(id: string) {
        this.categories = this.categories.filter(c => c.id !== id);
        this.tasks.forEach(t => {
            if (t.categoryId === id) {
                t.categoryId = undefined;
            }
        });
        if (this.selectedCategoryFilter === id) {
            this.selectedCategoryFilter = 'all';
        }
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

    get filteredTasks(): Task[] {
        if (this.selectedCategoryFilter === 'all') {
            return this.tasks;
        }
        return this.tasks.filter(t => t.categoryId === this.selectedCategoryFilter);
    }
}