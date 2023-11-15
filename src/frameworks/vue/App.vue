<script setup lang="ts">
import { mdiAntenna, mdiCardAccountDetails, mdiHome, mdiInformation, mdiMenuClose, mdiMenuOpen } from "@mdi/js";
import { ref } from "vue";

import SS_20230415_200600_004 from "@this/assets/images/ss/pso20230415_200600_004.jpg";
import SS_20230415_200628_007 from "@this/assets/images/ss/pso20230415_200628_007.jpg";
import SS_20230415_200647_008 from "@this/assets/images/ss/pso20230415_200647_008.jpg";

const drawer = ref(true);
</script>

<template>
	<v-app>
		<v-navigation-drawer v-model="drawer" :width="300">
			<v-list>
				<v-list-subheader>Wiki</v-list-subheader>

				<v-list-item link href="https://github.com/pso2-ritters/web/wiki" target="_blank">
					<template #prepend>
						<v-icon :icon="mdiHome" />
					</template>
					<v-list-item-title>トップ</v-list-item-title>
					<v-list-item-subtitle>Home</v-list-item-subtitle>
				</v-list-item>
				<v-list-item
					link
					href="https://github.com/pso2-ritters/web/wiki/%23%E4%BB%8A%E6%97%A5%E3%81%AE%E3%83%AA%E3%83%83%E3%82%BF%E3%83%BC%E3%82%BA"
					target="_blank"
				>
					<template #prepend>
						<v-icon :icon="mdiAntenna" />
					</template>
					<v-list-item-title>#今日のリッターズ</v-list-item-title>
					<v-list-item-subtitle>動画やSSなど</v-list-item-subtitle>
				</v-list-item>
				<v-list-item
					link
					href="https://github.com/pso2-ritters/web/wiki/%E6%9C%89%E7%9B%8A%E6%83%85%E5%A0%B1"
					target="_blank"
				>
					<template #prepend>
						<v-icon :icon="mdiInformation" />
					</template>
					<v-list-item-title>有益情報</v-list-item-title>
					<v-list-item-subtitle>GShade設定など</v-list-item-subtitle>
				</v-list-item>
				<v-divider></v-divider>

				<v-list-subheader>X (旧Twitter)</v-list-subheader>

				<v-list-item link href="https://twitter.com/pso2ritters" target="_blank">
					<template #prepend>
						<v-icon :icon="mdiCardAccountDetails" />
					</template>
					<v-list-item-title>PSO2@TEAM†Ritters†</v-list-item-title>
					<v-list-item-subtitle>@pso2ritters</v-list-item-subtitle>
				</v-list-item>
				<v-list-item link href="https://twitter.com/pso2ritters" target="_blank">
					<template #prepend>
						<v-icon :icon="mdiCardAccountDetails" />
					</template>
					<v-list-item-title>†Ritters†メンバー</v-list-item-title>
					<v-list-item-subtitle>@siro14142356</v-list-item-subtitle>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar>
			<v-app-bar-nav-icon @click="drawer = !drawer">
				<v-icon v-if="drawer" :icon="mdiMenuOpen" />
				<v-icon v-else :icon="mdiMenuClose" />
			</v-app-bar-nav-icon>
			<v-app-bar-title>†Ritters† in PSO2NGS Ship1</v-app-bar-title>
		</v-app-bar>

		<v-main>
			<v-container class="container">
				<v-alert density="compact" type="warning" class="mb-4">
					<v-alert-title>工事中</v-alert-title>
				</v-alert>
				<v-carousel cycle show-arrows="hover">
					<v-carousel-item :src="SS_20230415_200600_004" cover></v-carousel-item>
					<v-carousel-item :src="SS_20230415_200628_007" cover></v-carousel-item>
					<v-carousel-item :src="SS_20230415_200647_008" cover></v-carousel-item>
				</v-carousel>
				<p class="text-right">（C）SEGA　PHANTASY STAR ONLINE 2</p>
			</v-container>
		</v-main>
	</v-app>
</template>

<style scoped>
.container {
	max-width: 100%;
}
.navigation-list-icon {
	margin-top: -4px;
}
</style>
