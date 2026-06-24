import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';
import { Category } from '../../core/models/category.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class TodoStateService {
    private readonly TASKS_KEY = 'accenture_tasks';
    private readonly CATEGORIES_KEY = 'accenture_categories';

    private tasksSubject = new BehaviorSubject<Task[]>([]);
    private categoriesSubject = new BehaviorSubject<Category[]>([]);

    tasks$: Observable<Task[]> = this.tasksSubject.asObservable();
    categories$: Observable<Category[]> = this.categoriesSubject.asObservable();

    constructor(private localStorageService: LocalStorageService) {
        this.loadInitialData();
    }

    private loadInitialData() {
        this.localStorageService.get<Category[]>(this.CATEGORIES_KEY).subscribe(cats => {
            if (cats && cats.length > 0) {
                this.categoriesSubject.next(cats);
            } else {
                const defaultCats: Category[] = [
                    { id: 'cat-1', name: 'Trabajo', color: 'medium', createdAt: new Date() },
                    { id: 'cat-2', name: 'Personal', color: 'success', createdAt: new Date() }
                ];
                this.categoriesSubject.next(defaultCats);
                this.saveCategories(defaultCats);
            }
        });

        this.localStorageService.get<Task[]>(this.TASKS_KEY).subscribe(tasks => {
            if (tasks) {
                this.tasksSubject.next(tasks);
            }
        });
    }

    private saveTasks(tasks: Task[]) {
        this.localStorageService.set(this.TASKS_KEY, tasks).subscribe();
    }

    private saveCategories(categories: Category[]) {
        this.localStorageService.set(this.CATEGORIES_KEY, categories).subscribe();
    }

    addTask(title: string, categoryId?: string) {
        const currentTasks = this.tasksSubject.value;
        const newTask: Task = {
            id: 'task-' + Date.now(),
            title: title.trim(),
            isCompleted: false,
            categoryId: categoryId || undefined,
            createdAt: new Date()
        };
        const updated = [...currentTasks, newTask];
        this.tasksSubject.next(updated);
        this.saveTasks(updated);
    }

    toggleTaskStatus(taskId: string) {
        const updated = this.tasksSubject.value.map(task => {
            if (task.id === taskId) {
                return { ...task, isCompleted: !task.isCompleted };
            }
            return task;
        });
        this.tasksSubject.next(updated);
        this.saveTasks(updated);
    }

    deleteTask(taskId: string) {
        const updated = this.tasksSubject.value.filter(task => task.id !== taskId);
        this.tasksSubject.next(updated);
        this.saveTasks(updated);
    }

    addCategory(name: string, color: string) {
        const currentCategories = this.categoriesSubject.value;
        const newCategory: Category = {
            id: 'cat-' + Date.now(),
            name: name.trim(),
            color: color,
            createdAt: new Date()
        };
        const updated = [...currentCategories, newCategory];
        this.categoriesSubject.next(updated);
        this.saveCategories(updated);
    }

    deleteCategory(categoryId: string) {
        const updatedCats = this.categoriesSubject.value.filter(cat => cat.id !== categoryId);
        this.categoriesSubject.next(updatedCats);
        this.saveCategories(updatedCats);

        const updatedTasks = this.tasksSubject.value.map(task => {
            if (task.categoryId === categoryId) {
                return { ...task, categoryId: undefined };
            }
            return task;
        });
        this.tasksSubject.next(updatedTasks);
        this.saveTasks(updatedTasks);
    }
}