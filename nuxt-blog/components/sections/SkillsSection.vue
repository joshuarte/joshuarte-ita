<template>
  <section class="row module__bottom" aria-labelledby="skills-heading">
    <div class="col-sm-2">
      <h2 id="skills-heading" class="section-heading">&lt;skills/&gt;</h2>
    </div>
    <div class="col-sm-10">
      <ul class="skills-list">
        <li v-for="skill in skills" :key="skill.id">
          <p>
            <b>{{ skill.title }}</b> ({{ skill.technologies }})
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
defineProps({
  skills: {
    type: Array,
    default: () => [
      {
        id: 1,
        title: 'Sviluppo Web',
        technologies: 'MEVNstack, Wordpress'
      },
      {
        id: 2,
        title: 'GUI / UI / UX',
        technologies: 'Figma'
      },
      {
        id: 3,
        title: 'Design & Sviluppo Giochi',
        technologies: 'Game maker studio 2'
      },
      {
        id: 4,
        title: 'Design & Sviluppo Giochi Pubblicitari',
        technologies: 'GDevelop'
      },
      {
        id: 5,
        title: 'Design Assets di Gioco',
        technologies: 'Procreate Dreams'
      },
      {
        id: 6,
        title: 'Gestione progetti / Consulenza IT',
        technologies: 'Jira / Trello'
      }
    ]
  }
});
</script>

<style lang="scss" scoped>
.skills-list {
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 1rem;
    
    p {
      margin: 0;
    }
  }
}
</style>