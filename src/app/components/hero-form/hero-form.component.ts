import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HeroService } from 'src/app/hero.service';
import { Hero } from 'src/app/hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  constructor(private heroService: HeroService) {}

  heroForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  ngOnInit(): void {}

  onSubmit() {
    if (!this.heroForm.value.name) return;
    const newName: string = this.heroForm.value.name;

    const newHero: Hero = {
      id: Math.floor(Math.random() * 1000),
      name: newName,
    };

    this.heroService.addHero(newHero).subscribe((heroes) => {
      console.log(heroes);
    });

    this.heroForm.reset({
      name: '',
    });
  }
}
